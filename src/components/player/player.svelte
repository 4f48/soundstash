<script lang="ts">
	import { createPlayer, getPresignedUrl } from "@/lib/player";
	import { index, playing, playlist } from "@/lib/stores";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	let player: Howl | null = null;

	const current = $derived($playlist.at($index));

	let url = $state<URL>();
	$effect(() => {
		if (!current) return;
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
	});

	$effect(() => {
		const play = $playing;
		if (!player) return;
		if (play) player.play();
		else player.pause();
	});

	onDestroy(() => {
		if (player) {
			player.stop();
			player.unload();
		}
	});
</script>
