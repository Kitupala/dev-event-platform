import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { dbConnect } from "@/lib/mongodb";
import Event, { EventAttrs } from "@/database/event.model";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();

    // ---- Required file ----
    const file = formData.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required." },
        { status: 400 },
      );
    }

    // ---- Explicit field mapping (API contract) ----
    const event: Omit<EventAttrs, "slug"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      overview: formData.get("overview") as string,
      venue: formData.get("venue") as string,
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      mode: formData.get("mode") as string,
      audience: formData.get("audience") as string,
      organizer: formData.get("organizer") as string,
      agenda: formData.getAll("agenda") as string[],
      tags: formData.getAll("tags") as string[],
      image: "",
    };

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    // ---- Upload image to Cloudinary ----
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "dev-event-platform/events",
            },
            (err, result) => {
              if (err || !result) return reject(err);
              resolve(result as { secure_url: string });
            },
          )
          .end(buffer);
      },
    );

    // Attach image URL
    event["image"] = uploadResult.secure_url;

    // ---- Persist (schema handles slug + normalization) ----
    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      {
        message: "Event created successfully.",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Event creation failed.",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
