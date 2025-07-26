<script lang="ts">
	import Button from "@/components/button.svelte";
	import { queue, index } from "@/lib/stores";
	import { Icon, Play, Pencil, Trash } from "svelte-hero-icons";

	interface Props {
		playlist: App.Playlist;
		tracks: App.Track[];
	}
	const { playlist, tracks }: Props = $props();

	function play(): void {
		$index = 0;
		$queue = tracks;
	}
</script>

<div class="my-2 flex gap-1">
	<Button disabled={tracks.length < 1} onclick={play}
		><Icon src={Play} solid />Play</Button
	>
	<Button disabled size="icon" variant="secondary"
		><Icon src={Pencil} solid /></Button
	>
	<Button disabled size="icon" variant="secondary"
		><Icon src={Trash} solid /></Button
	>
</div>
