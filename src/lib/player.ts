import { playing } from "@/lib/stores";
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
		autoplay: true,
		html5: true,
		onpause: () => playing.set(false),
		onplay: () => playing.set(true),
		src: [src.toString()],
	});
}
