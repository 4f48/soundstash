import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { del } from "@vercel/blob";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async (ctx) => {
	const body: App.DeleteTrackRequest = await ctx.request.json();
	await del(body.id, {
		token: import.meta.env.BLOB_READ_WRITE_TOKEN,
	});
	await db.delete(track).where(eq(track.id, body.id));
	return new Response(null);
};
