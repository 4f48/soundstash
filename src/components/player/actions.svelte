<script lang="ts">
	import Toggle from "../toggle.svelte";
	import Button from "@/components/button.svelte";
	import { skip } from "@/lib/player";
	import { playing, playlist, index, repeat } from "@/lib/stores";
	import Pause from "phosphor-svelte/lib/Pause";
	import Play from "phosphor-svelte/lib/Play";
	import Repeat from "phosphor-svelte/lib/Repeat";
	import Shuffle from "phosphor-svelte/lib/Shuffle";
	import SkipBack from "phosphor-svelte/lib/SkipBack";
	import SkipForward from "phosphor-svelte/lib/SkipForward";

	function skipBack(): void {
		if ($repeat && $index === 0) $index = $playlist.length - 1;
		else skip(-1);
	}

	function skipForward(): void {
		if ($repeat && $index === $playlist.length - 1) $index = 0;
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
<Button size="icon" variant="ghost" onclick={() => ($playing = !$playing)}>
	{#if !$playing}
		<Play weight="fill" />
	{:else}
		<Pause weight="fill" />
	{/if}
</Button>
<Button
	disabled={!$repeat && $index === $playlist.length - 1}
	onclick={skipForward}
	size="icon"
	variant="ghost"><SkipForward weight="fill" /></Button
>
<Button size="icon" variant="ghost"><Shuffle weight="fill" /></Button>
