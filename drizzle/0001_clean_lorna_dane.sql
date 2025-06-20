CREATE TABLE "track" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"title" text NOT NULL,
	"artist" text NOT NULL,
	"blob" text NOT NULL,
	"size" integer NOT NULL,
	CONSTRAINT "track_blob_unique" UNIQUE("blob")
);
