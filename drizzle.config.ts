import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/schema",
	dialect: "sqlite",
	dbCredentials: {
		url: "file:soundstash.db",
	},
});
