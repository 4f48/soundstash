import { user } from "@/lib/schema/auth.schema";
import { relations } from "drizzle-orm";
import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const track = pgTable("track", {
	id: text("id").primaryKey(),
	owner: text("owner")
		.notNull()
		.references(() => user.id, { onDelete: "no action" }),
	title: text("title").notNull(),
	artist: text("artist").notNull(),
	blob: text("blob").notNull().unique(),
	size: integer("size").notNull(),
});
