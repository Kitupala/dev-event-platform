import mongoose from "mongoose";
import { describe, expect, it } from "vitest";

import { Booking } from "../database/booking.model";
import { Event } from "../database/event.model";
import { buildEventAttrs } from "./test-utils";

describe("Booking model", () => {
  it("saves successfully with valid eventId and email", async () => {
    const event = await Event.create(buildEventAttrs());

    const booking = new Booking({
      eventId: event._id,
      email: "USER@Example.com ",
    });

    const saved = await booking.save();

    expect(saved._id).toBeDefined();
    expect(saved.eventId.toString()).toBe(event._id.toString());
    expect(saved.email).toBe("user@example.com");
  });

  it("prevents saving with an invalid email format", async () => {
    const event = await Event.create(buildEventAttrs());

    const booking = new Booking({
      eventId: event._id,
      email: "not-an-email",
    });

    await expect(booking.save()).rejects.toMatchObject({
      name: "ValidationError",
    });
  });

  it("prevents saving if the referenced eventId does not exist", async () => {
    const nonexistentEventId = new mongoose.Types.ObjectId();

    const booking = new Booking({
      eventId: nonexistentEventId,
      email: "user@example.com",
    });

    await expect(booking.save()).rejects.toThrow(
      "Referenced event does not exist",
    );
  });
});
