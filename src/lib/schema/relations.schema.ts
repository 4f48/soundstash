import { relations } from "drizzle-orm";
import { playlist, playlistTrack } from "drizzle/schema";
import { track } from "drizzle/schema";

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
