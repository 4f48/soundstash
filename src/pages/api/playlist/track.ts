import { db } from "@/lib/database";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { track } from "drizzle/schema";

export const GET: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });

	const id = ctx.url.searchParams.get("id");
	if (!id) return new Response(null, { status: 400 });

	const playlist = await db.query.track.findFirst({
		columns: {
			id: true,
		},
		where: eq(track.id, id),
		with: {
			playlistTracks: {
				with: {
					playlist: true,
				},
			},
		},
	});
	if (!playlist) return new Response(null, { status: 400 });

	const tracks = playlist.playlistTracks.map(({ playlist }) => playlist);
	return new Response(JSON.stringify(tracks), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
