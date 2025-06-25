declare namespace App {
	interface Locals {
		user: import("better-auth").User | null;
		session: import("better-auth").Session | null;
	}
	interface Track {
		album?: string;
		id: string;
		owner?: string;
		title: string;
		artist: string;
		blob?: string;
		size: number;
	}
	interface DeleteTrackRequest {
		id: string;
	}
	interface GetMetadataRequest {
		blob: string;
	}
	interface GetPresignedUploadUrlRequest {
		contentLength: number;
		contentType: string;
	}
	interface GetPresignedUploadUrlResponse {
		key: string;
		url: string;
	}
	interface FinalizeUploadRequest {
		album?: string;
		artist: string;
		key: string;
		size: number;
		title: string;
	}
}
