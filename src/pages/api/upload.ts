import { db } from "@/lib/database";
import { track as trackTable } from "@/lib/schema/tracks.schema";
import { put } from "@vercel/blob";
import type { APIRoute } from "astro";
import { parseBlob } from "music-metadata";

const SUPPORTED_FILE_TYPES = ["audio/mpeg", "audio/flac"];

export const POST: APIRoute = async (ctx) => {
	const formData = await ctx.request.formData();
	const tracks = formData.getAll("track") as File[];
	if (tracks.length < 1)
		return new Response(null, {
			status: 500,
		});
	for (let i = 0; i < tracks.length; i++) {
		if (SUPPORTED_FILE_TYPES.includes(tracks[i].type)) {
			const uuid = crypto.randomUUID();
			const track = tracks[i];
			const { url } = await put(`tracks/${uuid}`, track, {
				access: "public",
				multipart: true,
				token: import.meta.env.BLOB_READ_WRITE_TOKEN,
			});
			const metadata = await parseBlob(track, {
				skipCovers: true,
			});
			await db.insert(trackTable).values({
				artist: metadata.common.artist!,
				blob: url,
				id: uuid,
				owner: ctx.locals.user?.id!,
				size: track.size,
				title: metadata.common.title!,
			});
		}
	}
	return new Response(null, {
		status: 200,
	});
};
