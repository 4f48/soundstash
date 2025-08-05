<script lang="ts">
	import AddToPlaylist from "./playlist-add/dialog.svelte";
	import Button from "@/components/button.svelte";
	import Item from "@/components/dropdownitem.svelte";
	import type { track as trackTable, playlist } from "@/lib/schema";
	import { queue, index } from "@/lib/stores";
	import { DropdownMenu } from "bits-ui";
	import ListPlus from "phosphor-svelte/lib/ListPlus";
	import Plus from "phosphor-svelte/lib/Plus";
	import { EllipsisHorizontal, Icon } from "svelte-hero-icons";

	type Playlist = typeof playlist.$inferSelect;
	type Track = typeof trackTable.$inferSelect;
	interface Props {
		playlists: Playlist[];
		track: Track;
	}
	const { playlists, track }: Props = $props();

	let open = $state(false);

	function addToQueue(): void {
		$queue = [
			...$queue.slice(0, $index + 1),
			track,
			...$queue.slice($index + 1),
		];
	}
</script>

<AddToPlaylist bind:open {playlists} {track} />
<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="ghost"
			><Icon src={EllipsisHorizontal} /></Button
		>
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="bg-bg1 text-fg border-bg2 flex flex-col rounded-sm border p-1"
		>
			<Item onclick={() => addToQueue()}><ListPlus />Add to queue</Item>
			<Item disabled={playlists.length < 1} onclick={() => (open = true)}
				><Plus />Add to playlist</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
