import { playlist, playlistTrack } from "@/lib/schema/playlists.schema";
import { track } from "@/lib/schema/tracks.schema";
import { relations } from "drizzle-orm";

export const playlistRelations = relations(playlist, ({ many }) => ({
	playlistTracks: many(playlistTrack),
}));

export const trackRelations = relations(track, ({ many }) => ({
	playlistTracks: many(playlistTrack),
}));

export const playlistTrackRelations = relations(playlistTrack, ({ one }) => ({
	playlist: one(playlist, {
		fields: [playlistTrack.playlistId],
		references: [playlist.id],
	}),
	track: one(track, {
		fields: [playlistTrack.trackId],
		references: [track.id],
	}),
}));
