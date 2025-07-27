<script lang="ts">
	import { createPlayer, getPresignedUrl } from "@/lib/player";
	import {
		index,
		playing,
		queue,
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

	const current = $derived($queue.at($index));

	let url = $state<URL>();
	$effect(() => {
		if (!current) return;
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		const currentIndex = $index;
		getPresignedUrl(current.id).then((result) => (url = result));
	});

	$effect(() => {
		if (!url) return;

		if (player) {
			player.stop();
			player.unload();
		}

		player = createPlayer(url);
		player.play();
		$playing = true;
	});

	$effect(() => {
		if ($playing) player?.play();
		else player?.pause();
	});

	$effect(() => {
		if (!$seeking && seek !== null && player) {
			player.seek(seek / 100);
			seek = null;
		}
	});

	$effect(() => {
		if ($seeking) seek = $position;
	});

	$effect(() => {
		if (!current) return;
		navigator.mediaSession.metadata = new MediaMetadata({
			title: current.title,
			artist: current.artist,
			album: current.album ? current.album : undefined,
			artwork: [
				{
					src: `/api/track/cover/${current.id}`,
				},
			],
		});
	});

	function handleKeyPlayPause(
		e: KeyboardEvent & { currentTarget: EventTarget & Window }
	): void {
		if (e.code === "Space" && !(e.target instanceof HTMLInputElement)) {
			e.preventDefault();

			$playing = !$playing;
		}
	}

	onDestroy(() => {
		clearInterval(interval);
		if (player) {
			player.stop();
			player.unload();
		}
	});
</script>

<svelte:window onkeydown={handleKeyPlayPause} />
