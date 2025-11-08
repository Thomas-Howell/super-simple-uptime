import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://devuser:devpass@localhost:5434/devdb",
  },
  verbose: true,
  strict: true,
});
