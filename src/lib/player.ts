import { index, repeat, queue } from "@/lib/stores";
import { Howl } from "howler";

/**
 * Safely gets a presigned URL authorized to access the audio source for a track by its identifier.
 * @param id Track identifier (UUIDv4)
 * @returns URL for downloading the track audio file
 */
export async function getPresignedUrl(id: string): Promise<URL> {
	const response = await fetch(`/api/track/${id}`);
	const url = await response.text();
	return new URL(url);
}

/**
 * Creates a new audio player instance.
 * @param src Audio source URL
 * @returns Howler music player instance
 */
export function createPlayer(src: URL): Howl {
	return new Howl({
		html5: true,
		onend: () => {
			if (index.get() === queue.get().length - 1 && repeat.get()) index.set(0);
			else if (index.get() < queue.get().length - 1) skip(1);
		},
		src: [src.toString()],
	});
}

/**
 * Skips n tracks in the queue
 * @param n Tracks to skip, negative number to jump back
 */
export function skip(n: number): void {
	index.set(index.get() + n);
}

/**
 * Shuffles an array of items using Fisher-Yates
 * @param arr Array to be shuffled
 * @returns Shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
	const shuffled = arr.slice();
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
