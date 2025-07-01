import { sql } from "drizzle-orm";
import {
	pgTable,
	text,
	timestamp,
	unique,
	boolean,
	foreignKey,
	integer,
	primaryKey,
} from "drizzle-orm/pg-core";

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }),
	updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const user = pgTable(
	"user",
	{
		id: text().primaryKey().notNull(),
		name: text().notNull(),
		email: text().notNull(),
		emailVerified: boolean("email_verified").notNull(),
		image: text(),
		createdAt: timestamp("created_at", { mode: "string" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
	},
	(table) => [unique("user_email_unique").on(table.email)]
);

export const account = pgTable(
	"account",
	{
		id: text().primaryKey().notNull(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id").notNull(),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at", {
			mode: "string",
		}),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
			mode: "string",
		}),
		scope: text(),
		password: text(),
		createdAt: timestamp("created_at", { mode: "string" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk",
		}).onDelete("cascade"),
	]
);

export const session = pgTable(
	"session",
	{
		id: text().primaryKey().notNull(),
		expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
		token: text().notNull(),
		createdAt: timestamp("created_at", { mode: "string" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id").notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk",
		}).onDelete("cascade"),
		unique("session_token_unique").on(table.token),
	]
);

export const track = pgTable(
	"track",
	{
		id: text().primaryKey().notNull(),
		owner: text().notNull(),
		title: text().notNull(),
		artist: text().notNull(),
		blob: text().notNull(),
		size: integer().notNull(),
		album: text(),
		length: integer().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.owner],
			foreignColumns: [user.id],
			name: "track_owner_user_id_fk",
		}),
		unique("track_blob_unique").on(table.blob),
	]
);

export const playlist = pgTable(
	"playlist",
	{
		id: text().primaryKey().notNull(),
		owner: text().notNull(),
		name: text().notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.owner],
			foreignColumns: [user.id],
			name: "playlist_owner_user_id_fk",
		}).onDelete("cascade"),
	]
);

export const playlistToTrack = pgTable(
	"playlist_track",
	{
		playlistId: text("playlist_id").notNull(),
		trackId: text("track_id").notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.playlistId],
			foreignColumns: [playlist.id],
			name: "playlist_track_playlist_id_playlist_id_fk",
		}).onDelete("cascade"),
		foreignKey({
			columns: [table.trackId],
			foreignColumns: [track.id],
			name: "playlist_track_track_id_track_id_fk",
		}).onDelete("cascade"),
		primaryKey({
			columns: [table.playlistId, table.trackId],
			name: "playlist_track_playlist_id_track_id_pk",
		}),
	]
);
