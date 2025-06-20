import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	const metadata: App.Track = JSON.parse(await ctx.request.json());
	console.debug(metadata);
	const user = ctx.locals.user;
	if (!user) throw Error("user is not defined");
	await db.insert(track).values({
		artist: metadata.artist,
		blob: metadata.blob!,
		id: metadata.id,
		owner: user.id,
		size: metadata.size,
		title: metadata.title,
	});
	return new Response(null);
};
