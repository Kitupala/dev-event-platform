import { randomUUID } from "node:crypto";

import type { EventAttrs } from "../database/event.model";

export const buildEventAttrs = (
  overrides: Partial<EventAttrs> = {},
): EventAttrs => {
  const title = overrides.title ?? `Test Event ${randomUUID()}`;

  return {
    title,
    // Required by schema, but overwritten by the pre-save hook when `title` changes.
    slug: overrides.slug ?? "placeholder-slug",
    description: "Test description",
    overview: "Test overview",
    image: "https://example.com/image.jpg",
    venue: "Test venue",
    location: "Test location",
    date: "2025-12-15T00:00:00.000Z",
    time: "9pm",
    mode: "online",
    audience: "Developers",
    agenda: ["Intro"],
    organizer: "Test organizer",
    tags: ["testing"],
    ...overrides,
  };
};
