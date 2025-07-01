ALTER TABLE "playlist" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_image_unique" UNIQUE("image");