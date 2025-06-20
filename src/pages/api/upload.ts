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
			onBeforeGenerateToken: async (pathname, clientPayload) => {
				return {
					allowedContentTypes: ["audio/mpeg", "audio/flac"],
					tokenPayload: clientPayload,
				};
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				console.log("blob upload completed", blob, tokenPayload);
				try {
					if (!tokenPayload) throw new Error("token payload is not defined");
					const metadata: App.Track = JSON.parse(tokenPayload);
					await db.insert(track).values({
						artist: metadata.artist,
						blob: metadata.blob!,
						id: metadata.id,
						owner: ctx.locals.user?.id!,
						size: metadata.size,
						title: metadata.title,
					});
				} catch (e) {
					throw new Error("could not update db");
				}
			},
		});

		console.log("HandleUpload completed, result:", result);
		return new Response(JSON.stringify(result), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		console.error("💥 Error in handler POST function:", e);
		if (e instanceof Error) {
			console.error("💥 Handler error message:", e.message);
			console.error("💥 Handler error stack:", e.stack);
			return new Response(e.message, {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			console.error("💥 Unknown error in handler");
			return new Response(null, {
				status: 500,
			});
		}
	}
};
