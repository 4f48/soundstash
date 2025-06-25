import { user } from "@/lib/schema/auth.schema";
import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const track = pgTable("track", {
	id: text("id").primaryKey(),
	owner: text("owner")
		.notNull()
		.references(() => user.id, { onDelete: "no action" }),
	title: text("title").notNull(),
	artist: text("artist").notNull(),
	album: text("album"),
	blob: text("blob").notNull().unique(),
	size: integer("size").notNull(),
});
