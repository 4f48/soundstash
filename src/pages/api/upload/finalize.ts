import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	try {
		console.log("Finalize endpoint called");

		const requestBody = await ctx.request.json();
		console.log("Request body received:", requestBody);

		const metadata: App.Track = requestBody;
		console.log("Parsed metadata:", metadata);

		const userId = ctx.request.headers.get("X-User-ID");
		if (!userId) {
			console.error("No user ID found in headers");
			return new Response("Unauthorized", { status: 401 });
		}

		console.log("Inserting track for user:", userId);

		const result = await db.insert(track).values({
			artist: metadata.artist,
			blob: metadata.blob!,
			id: metadata.id,
			owner: userId,
			size: metadata.size,
			title: metadata.title,
		});

		console.log("Track inserted successfully:", result);
		return new Response(JSON.stringify({ success: true }), {
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error in finalize endpoint:", error);
		if (error instanceof Error) {
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}
		return new Response(JSON.stringify({
			error: error instanceof Error ? error.message : "Unknown error"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
