import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { APIRoute } from "astro";
import type { IndexBuilderOn } from "drizzle-orm/singlestore-core";
import { parseBlob, type ICommonTagsResult } from "music-metadata";

export const POST: APIRoute = async (ctx) => {
	const body = (await ctx.request.json()) as HandleUploadBody;
	try {
		const result = await handleUpload({
			body,
			request: ctx.request,
			token: import.meta.env.BLOB_READ_WRITE_TOKEN,
			onBeforeGenerateToken: async (pathname, payload) => {
				return {
					allowedContentTypes: ["audio/mpeg", "audio/flac"],
					tokenPayload: payload,
				};
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				const metadata: App.Track = JSON.parse(tokenPayload!);
				await db.insert(track).values({
					artist: metadata.artist,
					blob: blob.url,
					id: metadata.id,
					owner: ctx.locals.user?.id!,
					size: metadata.size,
					title: metadata.title,
				});
			},
		});
		return new Response(JSON.stringify(result), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		if (e instanceof Error)
			return new Response(e.message, {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		else
			return new Response(null, {
				status: 500,
			});
	}
};
