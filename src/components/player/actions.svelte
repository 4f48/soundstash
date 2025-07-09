<script lang="ts">
	import Button from "@/components/button.svelte";
	import { playing } from "@/lib/stores";
	import Pause from "phosphor-svelte/lib/Pause";
	import Play from "phosphor-svelte/lib/Play";
	import Repeat from "phosphor-svelte/lib/Repeat";
	import Shuffle from "phosphor-svelte/lib/Shuffle";
	import SkipBack from "phosphor-svelte/lib/SkipBack";
	import SkipForward from "phosphor-svelte/lib/SkipForward";
</script>

<Button variant="ghost" size="icon"><Repeat weight="fill" /></Button>
<Button variant="ghost" size="icon"><SkipBack weight="fill" /></Button>
<Button variant="ghost" size="icon" onclick={() => ($playing = !$playing)}>
	{#if !$playing}
		<Play weight="fill" />
	{:else}
		<Pause weight="fill" />
	{/if}
</Button>
<Button variant="ghost" size="icon"><SkipForward weight="fill" /></Button>
<Button variant="ghost" size="icon"><Shuffle weight="fill" /></Button>
