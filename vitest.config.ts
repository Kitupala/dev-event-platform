import type { UserConfig } from "vitest/config";

export default {
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
  },
} satisfies UserConfig;
