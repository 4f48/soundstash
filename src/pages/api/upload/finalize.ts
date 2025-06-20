import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	const metadata: App.Track = JSON.parse(await ctx.request.json());
	console.debug(JSON.stringify(metadata));
	const userId = ctx.locals.user?.id;
	if (!userId) throw Error("user is not defined");
	await db.insert(track).values({
		artist: metadata.artist,
		blob: metadata.blob!,
		id: metadata.id,
		owner: userId,
		size: metadata.size,
		title: metadata.title,
	});
	return new Response(null);
};
