import { db } from "@/lib/database";
import { playlist, playlistToTrack } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export async function getPlaylistWithTracks(id: string) {
	return await db.query.playlist.findFirst({
		where: eq(playlist.id, id),
		with: {
			playlistToTracks: {
				columns: {
					trackId: true,
				},
			},
		},
	});
}
export type PlaylistWithTracks = Awaited<
	ReturnType<typeof getPlaylistWithTracks>
>;

export async function addToPlaylist(id: string, track: string): Promise<void> {
	await db
		.insert(playlistToTrack)
		.values({
			playlistId: id,
			trackId: track,
		})
		.onConflictDoNothing();
}

export async function removeFromPlaylist(
	id: string,
	track: string
): Promise<void> {
	await db
		.delete(playlistToTrack)
		.where(
			and(
				eq(playlistToTrack.playlistId, id),
				eq(playlistToTrack.trackId, track)
			)
		);
}

export async function renamePlaylist(id: string, name: string): Promise<void> {
	await db
		.update(playlist)
		.set({
			name,
		})
		.where(eq(playlist.id, id));
}
