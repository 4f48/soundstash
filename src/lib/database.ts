import * as schema from "@/lib/schema";
import { drizzle } from "drizzle-orm/libsql/web";

export const db = drizzle({
	connection: {
		authToken: import.meta.env.DATABASE_TOKEN,
		url: import.meta.env.DATABASE_URL,
	},
	schema,
});
