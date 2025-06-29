import { db } from "@/lib/database";
import type { APIRoute } from "astro";
import { playlist } from "drizzle/schema";

export const POST: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user)
		return new Response(null, {
			status: 401,
		});
	const request = (await ctx.request.json()) as App.NewPlaylistRequest;

	const id = crypto.randomUUID();
	try {
		await db.insert(playlist).values({
			id,
			name: request.name,
			owner: user.id,
		});
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return new Response("failed to create new playlist", {
			status: 500,
		});
	}

	return new Response(id);
};
