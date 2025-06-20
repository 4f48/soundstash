import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	const metadata: App.Track = JSON.parse(await ctx.request.json());
	console.debug(JSON.stringify(metadata));
	await db.insert(track).values({
		artist: metadata.artist,
		blob: metadata.blob!,
		id: metadata.id,
		owner: ctx.locals.user?.id!,
		size: metadata.size,
		title: metadata.title,
	});
	return new Response(null);
};
