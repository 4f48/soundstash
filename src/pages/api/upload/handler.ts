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
					console.log("Upload completed, processing...");
					if (!tokenPayload) throw Error("payload is not defined");
					const metadata: App.Track = JSON.parse(tokenPayload);
					metadata.blob = blob.url;

					console.log("Calling finalize endpoint with metadata:", metadata);
					const response = await fetch(import.meta.env.SITE + "/api/upload/finalize", {
						body: JSON.stringify(metadata),
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
					});

					if (!response.ok) {
						console.error("Finalize request failed:", response.status, response.statusText);
						const errorText = await response.text();
						console.error("Error details:", errorText);
					} else {
						console.log("Finalize request completed successfully");
					}
				} catch (e) {
					console.error("Error in onUploadCompleted:", e);
					if (e instanceof Error) console.error("Error message:", e.message);
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
