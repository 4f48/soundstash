import { user } from "@/lib/schema/auth.schema";
import { track } from "@/lib/schema/tracks.schema";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const playlist = pgTable("playlist", {
	id: text("id").primaryKey(),
	owner: text("owner")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const playlistTrack = pgTable(
	"playlist_track",
	{
		playlistId: text("playlist_id")
			.notNull()
			.references(() => playlist.id, { onDelete: "cascade" }),
		trackId: text("track_id")
			.notNull()
			.references(() => track.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.playlistId, table.trackId] })]
);
