import { db } from "@/lib/database";
import { playlist as playlistTable } from "@/lib/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });

	const id = ctx.url.searchParams.get("id");
	if (!id) return new Response(null, { status: 400 });

	const playlist = await db.query.playlist.findFirst({
		columns: {
			id: false,
			name: false,
			owner: false,
		},
		where: and(eq(playlistTable.id, id), eq(playlistTable.owner, user.id)),
		with: {
			playlistToTracks: {
				with: {
					track: true,
				},
			},
		},
	});
	if (!playlist) return new Response(null, { status: 401 });

	const tracks = playlist.playlistToTracks.map(({ track }) => track);
	return new Response(JSON.stringify(tracks), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
