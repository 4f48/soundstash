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
				try {
					if (!tokenPayload) throw Error("payload is not defined");
					const metadata: App.Track = JSON.parse(tokenPayload);
					metadata.blob = blob.url;

					fetch(import.meta.env.SITE + "/api/upload/finalize", {
						body: JSON.stringify(tokenPayload),
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
					});
				} catch (e) {
					if (e instanceof Error) console.error(e.message);
				}
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
