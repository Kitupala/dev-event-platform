import { describe, expect, it } from "vitest";

import Event from "../database/event.model";
import { buildEventAttrs } from "./test-utils";

describe("Event model", () => {
  it("generates the correct slug from the title on save", async () => {
    const event = await Event.create(
      buildEventAttrs({
        title: '  Bob\'s "Great" Event!!!  ',
      }),
    );

    expect(event.slug).toBe("bobs-great-event");
  });

  it("normalizes date and time fields correctly on save", async () => {
    const event = await Event.create(
      buildEventAttrs({
        date: "2025-12-15T15:30:00.000Z",
        time: "9pm",
      }),
    );

    expect(event.date).toBe("2025-12-15");
    expect(event.time).toBe("21:00");
  });
});
