type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		user: import("better-auth").User | null;
		session: import("better-auth").Session | null;
	}

	type Playlist =
		typeof import("@/lib/schema/playlists.schema").playlist.$inferSelect;
	type Track = typeof import("@/lib/schema/tracks.schema").track.$inferSelect;

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
	interface ModifyPlaylistRequest {
		playlistId: string;
		trackId: string;
	}
}
