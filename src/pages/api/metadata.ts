import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async (ctx) => {
	const request = (await ctx.request.json()) as App.GetMetadataRequest;
	const result = await db.query.track.findFirst({
		where: eq(track.blob, request.blob),
		columns: {
			id: false,
			blob: false,
			owner: false,
			size: false,
		},
	});
	return new Response(result?.title);
};
