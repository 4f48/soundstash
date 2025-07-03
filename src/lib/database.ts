import * as schema from "@/lib/schema";
import { DATABASE_TOKEN, DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql/web";

export const db = drizzle({
	connection: {
		authToken: DATABASE_TOKEN,
		url: DATABASE_URL,
	},
	schema,
});
