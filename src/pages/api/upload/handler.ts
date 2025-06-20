import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { APIRoute } from "astro";
import type { IndexBuilderOn } from "drizzle-orm/singlestore-core";
import { parseBlob, type ICommonTagsResult } from "music-metadata";

export const POST: APIRoute = async (ctx) => {
	const body = (await ctx.request.json()) as HandleUploadBody;
	console.log("Handler endpoint called, body:", body);
	try {
		console.log("Starting handleUpload process...");
		console.log("Environment SITE:", import.meta.env.SITE);
		const result = await handleUpload({
			body,
			request: ctx.request,
			token: import.meta.env.BLOB_READ_WRITE_TOKEN,
			onBeforeGenerateToken: async (pathname, clientPayload) => {
				console.log("onBeforeGenerateToken called with pathname:", pathname);
				console.log("onBeforeGenerateToken clientPayload:", clientPayload);
				return {
					allowedContentTypes: ["audio/mpeg", "audio/flac"],
					tokenPayload: clientPayload,
				};
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				console.log("🎉 onUploadCompleted callback triggered!");
				console.log("Blob object:", blob);
				console.log("Token payload:", tokenPayload);

				try {
					console.log("Upload completed, processing...");
					if (!tokenPayload) {
						console.error("❌ tokenPayload is null or undefined");
						throw Error("payload is not defined");
					}

					console.log("Parsing tokenPayload...");
					const metadata: App.Track & { userId: string } = JSON.parse(tokenPayload);
					console.log("Parsed metadata:", metadata);

					metadata.blob = blob.url;
					console.log("Updated metadata with blob URL:", metadata);

					const finalizeUrl = "https://soundstash.pirger.eu/api/upload/finalize";
					console.log("🚀 Calling finalize endpoint:", finalizeUrl);
					console.log("Request body:", JSON.stringify(metadata));

					const response = await fetch(finalizeUrl, {
						body: JSON.stringify(metadata),
						headers: {
							"Content-Type": "application/json",
							"X-User-ID": metadata.userId,
						},
						method: "POST",
					});

					console.log("📡 Finalize response status:", response.status);
					console.log("📡 Finalize response headers:", Object.fromEntries(response.headers.entries()));

					if (!response.ok) {
						console.error("❌ Finalize request failed:", response.status, response.statusText);
						const errorText = await response.text();
						console.error("❌ Error details:", errorText);
					} else {
						console.log("✅ Finalize request completed successfully");
						const responseText = await response.text();
						console.log("✅ Finalize response body:", responseText);
					}
				} catch (e) {
					console.error("💥 Error in onUploadCompleted:", e);
					if (e instanceof Error) {
						console.error("💥 Error message:", e.message);
						console.error("💥 Error stack:", e.stack);
					}
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
