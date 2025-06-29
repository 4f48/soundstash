ALTER TABLE "playlist_track" RENAME TO "playlist_to_track";--> statement-breakpoint
ALTER TABLE "playlist_to_track" DROP CONSTRAINT "playlist_track_playlist_id_playlist_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist_to_track" DROP CONSTRAINT "playlist_track_track_id_track_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist_to_track" DROP CONSTRAINT "playlist_track_playlist_id_track_id_pk";--> statement-breakpoint
ALTER TABLE "playlist_to_track" ADD CONSTRAINT "playlist_to_track_playlist_id_track_id_pk" PRIMARY KEY("playlist_id","track_id");--> statement-breakpoint
ALTER TABLE "playlist_to_track" ADD CONSTRAINT "playlist_to_track_playlist_id_playlist_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_to_track" ADD CONSTRAINT "playlist_to_track_track_id_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."track"("id") ON DELETE cascade ON UPDATE no action;