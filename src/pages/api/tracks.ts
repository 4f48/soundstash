import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ locals }) => {
	if (!locals.user?.id) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const tracks = await db.query.track.findMany({
			where: eq(track.owner, locals.user.id),
		});

		return new Response(JSON.stringify(tracks), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching tracks:", error);
		return new Response(JSON.stringify({ error: "Failed to fetch tracks" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
