import { playlist, playlistToTrack } from "@/lib/schema/playlists.schema";
import { track } from "@/lib/schema/tracks.schema";
import { relations } from "drizzle-orm";

export const playlistRelations = relations(playlist, ({ many }) => ({
	playlistToTracks: many(playlistToTrack),
}));

export const trackRelations = relations(track, ({ many }) => ({
	playlistToTracks: many(playlistToTrack),
}));

export const playlistToTrackRelations = relations(
	playlistToTrack,
	({ one }) => ({
		playlist: one(playlist, {
			fields: [playlistToTrack.playlistId],
			references: [playlist.id],
		}),
		track: one(track, {
			fields: [playlistToTrack.trackId],
			references: [track.id],
		}),
	})
);
