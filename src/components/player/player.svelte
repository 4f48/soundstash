<script lang="ts">
	import { createPlayer, getPresignedUrl } from "@/lib/player";
	import {
		index,
		playing,
		playlist,
		seeking,
		progress,
		position,
	} from "@/lib/stores";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	let player: Howl | null = null;
	let seek: number | null = null;

	const interval = setInterval(() => {
		if (!player) return;
		const pos = player.seek() * 100;
		if (!$seeking) $position = pos;
		$progress = pos;
	}, 100);

	const current = $derived($playlist.at($index));

	let url = $state<URL | null>(null);

	$effect(() => {
		if (!current) {
			url = null;
			return;
		}

		getPresignedUrl(current.id)
			.then((result) => (url = result))
			.catch((err) => {
				console.error("Failed to get presigned URL:", err);
			});
	});

	$effect(() => {
		if (!url) return;
		clearPlayer();

		player = createPlayer(url);
		player.play();
	});

	$effect(() => {
		if (!player) return;
		if ($playing) {
			player.play();
		} else {
			player.pause();
		}
	});

	$effect(() => {
		if (!$seeking && seek !== null && player) {
			player.seek(seek / 100);
			seek = null;
		}
	});

	$effect(() => {
		if ($seeking) {
			seek = $position;
		}
	});

	$effect(() => {
		if (!current) return;

		navigator.mediaSession.metadata = new MediaMetadata({
			title: current.title,
			artist: current.artist,
			album: current.album || undefined,
			artwork: [
				{
					src: `/api/track/cover/${current.id}`,
				},
			],
		});
	});

	onDestroy(() => {
		clearInterval(interval);
		clearPlayer();
	});

	function clearPlayer(): void {
		if (player) {
			player.stop();
			player.unload();
			player = null;
		}
	}
</script>
