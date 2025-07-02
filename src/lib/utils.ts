import type { track, playlist as playlistTable } from "@/lib/schema";
import { $currentTrack, $playing, $playlist } from "@/lib/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export async function playPlaylist(
	playlist: typeof playlistTable.$inferSelect
) {
	const playlistToTracks = (await (
		await fetch(`/api/playlist/tracks?id=${playlist.id}`)
	).json()) as (typeof track.$inferSelect)[];
  if (playlistToTracks.length <= 0) return;
	$playing.set(false);
	$playlist.set(playlistToTracks);
	$currentTrack.set(0);
	$playing.set(true);
}

export async function playPlaylistShuffled(
	playlist: typeof playlistTable.$inferSelect
) {
	const playlistToTracks = (await (
		await fetch(`/api/playlist/tracks?id=${playlist.id}`)
	).json()) as (typeof track.$inferSelect)[];
	if (playlistToTracks.length <= 0) return;

	const shuffledTracks = [...playlistToTracks];
	for (let i = shuffledTracks.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledTracks[i], shuffledTracks[j]] = [
			shuffledTracks[j],
			shuffledTracks[i],
		];
	}

	$playing.set(false);
	$playlist.set(shuffledTracks);
	$currentTrack.set(0);
	$playing.set(true);
}
