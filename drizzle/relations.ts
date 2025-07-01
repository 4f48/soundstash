import {
	user,
	account,
	session,
	track,
	playlist,
	playlistToTrack,
} from "./schema";
import { relations } from "drizzle-orm/relations";

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
	sessions: many(session),
	tracks: many(track),
	playlists: many(playlist),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const trackRelations = relations(track, ({ one, many }) => ({
	user: one(user, {
		fields: [track.owner],
		references: [user.id],
	}),
	playlistToTracks: many(playlistToTrack),
}));

export const playlistRelations = relations(playlist, ({ one, many }) => ({
	user: one(user, {
		fields: [playlist.owner],
		references: [user.id],
	}),
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
