<script lang="ts">
	import Item from "./item.svelte";
	import Dialog from "@/components/dialog.svelte";

	interface Props {
		open: boolean;
		playlists: App.Playlist[];
		track: App.Track;
	}
	let { open = $bindable(), playlists, track }: Props = $props();
</script>

<Dialog bind:open>
	{#snippet title()}Add to playlist{/snippet}
	{#snippet description()}
		Add "{track.title}" to a playlist for seamless listening sessions.
	{/snippet}
	<table class="w-full">
		<tbody class="[&_tr]:border-bg3 [&_tr]:border-b [&_tr]:last:border-none">
			{#each playlists as playlist (playlist.id)}
				<Item {playlist} {track} />
			{/each}
		</tbody>
	</table>
</Dialog>
