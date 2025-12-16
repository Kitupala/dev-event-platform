import mongoose, { type HydratedDocument, type Model } from "mongoose";

import {
  isNonEmptyString,
  isNonEmptyStringArray,
  normalizeDateToISO,
  normalizeTimeToHHmm,
  slugify,
} from "../lib/model-helpers";

export type EventMode = "online" | "offline" | "hybrid" | (string & {});

export interface EventAttrs {
  title: string;
  slug?: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: EventMode;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
}

export type EventDoc = HydratedDocument<EventAttrs>;

const EventSchema = new mongoose.Schema<EventAttrs>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Title is required",
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Slug is required",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Description is required",
      },
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Overview is required",
      },
    },
    image: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Image is required",
      },
    },
    venue: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Venue is required",
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Location is required",
      },
    },
    date: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Date is required",
      },
    },
    time: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Time is required",
      },
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Mode is required",
      },
    },
    audience: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Audience is required",
      },
    },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: isNonEmptyStringArray,
        message: "Agenda must be a non-empty array of strings",
      },
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isNonEmptyString,
        message: "Organizer is required",
      },
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: isNonEmptyStringArray,
        message: "Tags must be a non-empty array of strings",
      },
    },
  },
  {
    // Automatically maintain `createdAt`/`updatedAt`.
    timestamps: true,
  },
);

EventSchema.pre("validate", function (this: EventDoc) {
  // Generate slug before validation so `slug` can stay required in the schema.
  if (this.isNew || this.isModified("title") || !this.slug) {
    const nextSlug = slugify(this.title);
    if (!nextSlug) throw new Error("Title must not be empty");
    this.slug = nextSlug;
  }

  // Keep date/time consistently formatted to prevent duplicate/ambiguous values.
  this.date = normalizeDateToISO(this.date);
  this.time = normalizeTimeToHHmm(this.time);
});

const Event: Model<EventAttrs> =
  mongoose.models.Event ?? mongoose.model("Event", EventSchema);

export default Event;
