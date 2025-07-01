import { db } from "@/lib/database";
import { playlist, playlistToTrack, track } from "@/lib/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });
	const request = (await ctx.request.json()) as App.ModifyPlaylistRequest;

	try {
		const isTrackOwned = await db.query.track.findFirst({
			where: and(eq(track.id, request.trackId), eq(track.owner, user.id)),
		});
		const isPlaylistOwned = await db.query.playlist.findFirst({
			where: and(
				eq(playlist.id, request.playlistId),
				eq(playlist.owner, user.id)
			),
		});
		if (!isTrackOwned || !isPlaylistOwned)
			return new Response(null, { status: 403 });

		await db
			.insert(playlistToTrack)
			.values({
				playlistId: request.playlistId,
				trackId: request.trackId,
			})
			.onConflictDoNothing();
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return new Response("failed to add track to playlist", {
			status: 500,
		});
	}

	return new Response(null);
};
