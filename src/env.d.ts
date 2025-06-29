declare namespace App {
	interface Locals {
		user: import("better-auth").User | null;
		session: import("better-auth").Session | null;
	}
	interface DeleteTrackRequest {
		id: string;
	}
	interface GetMetadataRequest {
		blob: string;
	}
	interface GetPresignedUploadUrlRequest {
		coverLength?: number;
		coverType?: string;
		trackLength: number;
		trackType: string;
	}
	interface GetPresignedUploadUrlResponse {
		uuid: string;
		trackUrl: string;
		coverUrl?: string;
	}
	interface FinalizeUploadRequest {
		album?: string;
		artist: string;
		id: string;
		size: number;
		title: string;
		length: number;
	}
	interface NewPlaylistRequest {
		name: string;
	}
}
