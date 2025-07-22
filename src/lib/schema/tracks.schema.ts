import { user } from "@/lib/schema/auth.schema";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const track = sqliteTable("track", {
	album: text("album"),
	artist: text("artist").notNull(),
	cover: integer("cover", { mode: "boolean" }).notNull().default(false),
	id: text("id").primaryKey(),
	length: integer("length").notNull(),
	size: integer("size").notNull(),
	title: text("title").notNull(),
	owner: text("owner")
		.notNull()
		.references(() => user.id, { onDelete: "no action" }),
});
