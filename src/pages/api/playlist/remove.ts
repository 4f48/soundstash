import { db } from "@/lib/database";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";
import { playlist, playlistTrack, track } from "drizzle/schema";

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
			.delete(playlistTrack)
			.where(
				and(
					eq(playlistTrack.playlistId, request.playlistId),
					eq(playlistTrack.trackId, request.trackId)
				)
			);
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return new Response("failed to add track to playlist", {
			status: 500,
		});
	}

	return new Response(null);
};
