<script lang="ts">
	import Toggle from "../toggle.svelte";
	import Button from "@/components/button.svelte";
	import { skip } from "@/lib/player";
	import { shuffle as shuffleArray } from "@/lib/player";
	import type { track } from "@/lib/schema";
	import {
		playing,
		playlist,
		index,
		repeat,
		queue,
		shuffle,
	} from "@/lib/stores";
	import { effect } from "nanostores";
	import Pause from "phosphor-svelte/lib/Pause";
	import Play from "phosphor-svelte/lib/Play";
	import Repeat from "phosphor-svelte/lib/Repeat";
	import Shuffle from "phosphor-svelte/lib/Shuffle";
	import SkipBack from "phosphor-svelte/lib/SkipBack";
	import SkipForward from "phosphor-svelte/lib/SkipForward";

	effect([shuffle, playlist], (shuffle, playlist) => {
		if (!shuffle) {
			$queue = playlist;
			const current = $queue.at($index);
			if (!current) return;
			const indexes = playlist.map(({ id }) => id);
			$index = indexes.findIndex((i) => i === current.id);
		} else {
			const before = playlist.slice(0, $index);
			const after = playlist.slice($index + 1, playlist.length);

			const shuffled: (typeof track.$inferSelect)[] = [];
			shuffled.push(...shuffleArray(before));
			shuffled.push(playlist[$index]);
			shuffled.push(...shuffleArray(after));

			$queue = shuffled;
		}
	});

	function skipBack(): void {
		if ($repeat && $index === 0) $index = $queue.length - 1;
		else skip(-1);
	}

	function skipForward(): void {
		if ($repeat && $index === $queue.length - 1) $index = 0;
		else skip(1);
	}
</script>

<Toggle bind:pressed={$repeat}><Repeat weight="fill" /></Toggle>
<Button
	disabled={!$repeat && $index === 0}
	onclick={skipBack}
	size="icon"
	variant="ghost"><SkipBack weight="fill" /></Button
>
<Button
	disabled={$queue.length === 0}
	size="icon"
	variant="ghost"
	onclick={() => ($playing = !$playing)}
>
	{#if !$playing}
		<Play weight="fill" />
	{:else}
		<Pause weight="fill" />
	{/if}
</Button>
<Button
	disabled={!$repeat && $index >= $queue.length - 1}
	onclick={skipForward}
	size="icon"
	variant="ghost"><SkipForward weight="fill" /></Button
>
<Toggle bind:pressed={$shuffle}><Shuffle weight="fill" /></Toggle>
