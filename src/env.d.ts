/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	interface Locals {
		user: import("better-auth").User | null;
		session: import("better-auth").Session | null;
	}
	interface Track {
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
		artist: string;
		key: string;
		size: number;
		title: string;
	}
}
