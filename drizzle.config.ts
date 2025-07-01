import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/schema",
	dialect: "turso",
	dbCredentials: {
		authToken: process.env.DATABASE_TOKEN!,
		url: process.env.DATABASE_URL!,
	},
});
