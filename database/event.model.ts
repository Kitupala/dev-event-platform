import mongoose, { type HydratedDocument, type Model } from "mongoose";

export type EventMode = "online" | "offline" | "hybrid" | (string & {});

export interface EventAttrs {
  title: string;
  slug: string;
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

const isNonEmptyString = (value: unknown): boolean =>
  typeof value === "string" && value.trim().length > 0;

const isNonEmptyStringArray = (value: unknown): boolean =>
  Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeDateToISO = (value: string): string => {
  // Normalize to `YYYY-MM-DD` (ISO 8601 date) for consistent querying/sorting.
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return d.toISOString().slice(0, 10);
};

const normalizeTimeToHHmm = (value: string): string => {
  // Accept `H`, `HH`, `H:mm`, `HH:mm`, optionally with `am/pm`, and store as `HH:mm`.
  const match = value
    .trim()
    .match(/^([0-1]?\d|2[0-3])(?::([0-5]\d))?\s*(am|pm)?$/i);
  if (!match) throw new Error("Invalid time");

  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? "0");
  const meridiem = match[3]?.toLowerCase();

  if (meridiem) {
    // Convert 12h clock to 24h.
    if (hours === 12) hours = 0;
    if (meridiem === "pm") hours += 12;
  }

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
};

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

EventSchema.index({ slug: 1 }, { unique: true });

EventSchema.pre("save", function (this: EventDoc) {
  // Only regenerate the slug when the title changes.
  if (this.isModified("title")) {
    const nextSlug = slugify(this.title);
    if (!nextSlug) throw new Error("Title must not be empty");
    this.slug = nextSlug;
  }

  // Keep date/time consistently formatted to prevent duplicate/ambiguous values.
  this.date = normalizeDateToISO(this.date);
  this.time = normalizeTimeToHHmm(this.time);
});

export const Event: Model<EventAttrs> =
  mongoose.models.Event ?? mongoose.model("Event", EventSchema);
