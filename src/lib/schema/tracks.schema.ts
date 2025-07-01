import { user } from "@/lib/schema/auth.schema";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const track = sqliteTable("track", {
	id: text("id").primaryKey(),
	owner: text("owner")
		.notNull()
		.references(() => user.id, { onDelete: "no action" }),
	title: text("title").notNull(),
	artist: text("artist").notNull(),
	album: text("album"),
	blob: text("blob").notNull().unique(),
	length: integer("length").notNull(),
	size: integer("size").notNull(),
});
