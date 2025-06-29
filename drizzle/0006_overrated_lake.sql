CREATE TABLE "playlist" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playlist_track" (
	"playlist_id" text NOT NULL,
	"track_id" text NOT NULL,
	CONSTRAINT "playlist_track_playlist_id_track_id_pk" PRIMARY KEY("playlist_id","track_id")
);
--> statement-breakpoint
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_track" ADD CONSTRAINT "playlist_track_playlist_id_playlist_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_track" ADD CONSTRAINT "playlist_track_track_id_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."track"("id") ON DELETE cascade ON UPDATE no action;