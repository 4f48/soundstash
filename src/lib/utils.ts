import { $currentTrack, $playing, $playlist } from "@/lib/stores";
import { clsx, type ClassValue } from "clsx";
import type { track, playlist as playlistTable } from "drizzle/schema";
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
	const playlistTracks = (await (
		await fetch(`/api/playlist/tracks?id=${playlist.id}`)
	).json()) as (typeof track.$inferSelect)[];
	$playing.set(false);
	$playlist.set(playlistTracks);
	$currentTrack.set(0);
	$playing.set(true);
}
