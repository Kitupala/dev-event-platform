import mongoose, {
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";
import { Event } from "./event.model";

export interface BookingAttrs {
  eventId: Types.ObjectId;
  email: string;
}

export type BookingDoc = HydratedDocument<BookingAttrs>;

const isNonEmptyString = (value: unknown): boolean =>
  typeof value === "string" && value.trim().length > 0;

const isValidEmail = (value: string): boolean => {
  // Intentionally simple; strict RFC email regexes are often counterproductive.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const BookingSchema = new mongoose.Schema<BookingAttrs>(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true, // Common query pattern: list bookings for an event.
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: unknown) =>
          isNonEmptyString(v) && isValidEmail(String(v)),
        message: "A valid email is required",
      },
    },
  },
  {
    // Automatically maintain `createdAt`/`updatedAt`.
    timestamps: true,
  },
);

BookingSchema.pre("save", async function (this: BookingDoc) {
  // Ensure we never create bookings for a non-existent event.
  if (this.isNew || this.isModified("eventId")) {
    const exists = await Event.exists({ _id: this.eventId });
    if (!exists) throw new Error("Referenced event does not exist");
  }
});

export const Booking: Model<BookingAttrs> =
  mongoose.models.Booking ?? mongoose.model("Booking", BookingSchema);
