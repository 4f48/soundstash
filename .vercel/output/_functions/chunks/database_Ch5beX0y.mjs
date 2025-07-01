import { pgTable, timestamp, text, boolean, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").$defaultFn(() => false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});
const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
});
const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
});
const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  )
});

const track = pgTable("track", {
  id: text("id").primaryKey(),
  owner: text("owner").notNull().references(() => user.id, { onDelete: "no action" }),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album"),
  blob: text("blob").notNull().unique(),
  length: integer("length").notNull(),
  size: integer("size").notNull()
});

const playlist = pgTable("playlist", {
  id: text("id").primaryKey(),
  owner: text("owner").notNull().references(() => user.id, { onDelete: "cascade" }),
  image: text("image").unique(),
  name: text("name").notNull()
});
const playlistToTrack = pgTable(
  "playlist_to_track",
  {
    playlistId: text("playlist_id").notNull().references(() => playlist.id, { onDelete: "cascade" }),
    trackId: text("track_id").notNull().references(() => track.id, { onDelete: "cascade" })
  },
  (table) => [primaryKey({ columns: [table.playlistId, table.trackId] })]
);

const playlistRelations = relations(playlist, ({ many }) => ({
  playlistToTracks: many(playlistToTrack)
}));
const trackRelations = relations(track, ({ many }) => ({
  playlistToTracks: many(playlistToTrack)
}));
const playlistToTrackRelations = relations(
  playlistToTrack,
  ({ one }) => ({
    playlist: one(playlist, {
      fields: [playlistToTrack.playlistId],
      references: [playlist.id]
    }),
    track: one(track, {
      fields: [playlistToTrack.trackId],
      references: [track.id]
    })
  })
);

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	account,
	playlist,
	playlistRelations,
	playlistToTrack,
	playlistToTrackRelations,
	session,
	track,
	trackRelations,
	user,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

const db = drizzle("postgres://neondb_owner:npg_LUtY1uTC9exl@ep-red-term-a2fjp59p-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require", { schema });

export { playlistToTrack as a, db as d, playlist as p, track as t };
