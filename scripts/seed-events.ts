import "dotenv/config";

import { readFile } from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

import Event from "../database/event.model";
import { detailedEvents } from "../lib/constants";

const parseArgs = (argv: string[]) => {
  const flags = new Set(argv);
  return {
    dryRun: flags.has("--dry-run") || flags.has("-n"),
  };
};

const nonEmpty = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const validateDataset = (): void => {
  const requiredStringFields: Array<keyof (typeof detailedEvents)[number]> = [
    "title",
    "slug",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  detailedEvents.forEach((e, idx) => {
    for (const key of requiredStringFields) {
      if (!nonEmpty(e[key])) {
        throw new Error(
          `detailedEvents[${idx}] is missing required field: ${String(key)}`,
        );
      }
    }

    if (!Array.isArray(e.agenda) || e.agenda.length === 0) {
      throw new Error(
        `detailedEvents[${idx}] agenda must be a non-empty array`,
      );
    }

    if (!Array.isArray(e.tags) || e.tags.length === 0) {
      throw new Error(`detailedEvents[${idx}] tags must be a non-empty array`);
    }
  });
};

const resolveLocalImagePath = (image: string): string | null => {
  // We store local images as `/images/foo.png` and they live under `public/images/foo.png`.
  if (!image.startsWith("/images/")) return null;
  return path.join(process.cwd(), "public", image);
};

type UploadResult = { secure_url: string };

const uploadImageToCloudinary = async (
  localFilePath: string,
  slug: string,
): Promise<UploadResult> => {
  const { v2: cloudinary } = await import("cloudinary");

  const buffer = await readFile(localFilePath);

  return await new Promise<UploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "dev-event-platform/events",
          public_id: slug,
          overwrite: true,
          invalidate: true,
        },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result as UploadResult);
        },
      )
      .end(buffer);
  });
};

const main = async (): Promise<void> => {
  const { dryRun } = parseArgs(process.argv.slice(2));

  validateDataset();

  if (dryRun) {
    console.log(
      `[seed:events] DRY RUN: would upsert ${detailedEvents.length} events (overwrite by slug) and upload images to Cloudinary.`,
    );
    return;
  }

  const { dbConnect } = await import("../lib/mongodb");
  await dbConnect();

  let inserted = 0;
  let updated = 0;

  for (const item of detailedEvents) {
    // Upload local images from /public/images to Cloudinary and store the remote URL.
    // If `image` is already a URL, keep it as-is.
    const localImagePath = resolveLocalImagePath(item.image);
    const imageUrl = localImagePath
      ? (await uploadImageToCloudinary(localImagePath, item.slug)).secure_url
      : item.image;

    const eventDoc = {
      ...item,
      image: imageUrl,
    };

    // Overwrite existing events by slug.
    // Using updateOne avoids duplicate key errors and makes the script re-runnable.
    const res = await Event.updateOne(
      { slug: item.slug },
      { $set: eventDoc },
      { upsert: true, runValidators: true },
    );

    // `upsertedCount` indicates a new document was inserted.
    // `modifiedCount` indicates an existing doc changed.
    if (res.upsertedCount === 1) inserted += 1;
    else if (res.modifiedCount === 1) updated += 1;
  }

  console.log(
    `[seed:events] Completed. total=${detailedEvents.length} inserted=${inserted} updated=${updated}`,
  );
};

main()
  .then(async () => {
    // Ensure the process can exit cleanly.
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (err: unknown) => {
    console.error("[seed:events] Failed:", err);
    await mongoose.disconnect();
    process.exit(1);
  });
