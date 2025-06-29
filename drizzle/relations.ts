import {
	user,
	account,
	session,
	track,
	playlist,
	playlistTrack,
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
	playlistTracks: many(playlistTrack),
}));

export const playlistRelations = relations(playlist, ({ one, many }) => ({
	user: one(user, {
		fields: [playlist.owner],
		references: [user.id],
	}),
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
