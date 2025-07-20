<script lang="ts">
	import Checkbox from "@/components/checkbox.svelte";
	import type { PlaylistWithTracks } from "@/lib/playlist";
	import { Label } from "bits-ui";
	import { onMount } from "svelte";

	interface Props {
		playlist: App.Playlist;
		track: App.Track;
	}
	let { playlist, track }: Props = $props();

	let checked = $state(false);
	let loading = $state(true);
	onMount(async () => {
		await checkTrack();
	});

	async function checkTrack(): Promise<void> {
		const result = (await (
			await fetch(`/api/playlist?id=${playlist.id}`)
		).json()) as PlaylistWithTracks;
		if (!result) return;
		if (
			result.playlistToTracks.map(({ trackId }) => trackId).includes(track.id)
		)
			checked = true;
		else checked = false;

		loading = false;
	}

	async function handleClick(): Promise<void> {
		loading = true;
		await fetch(
			`/api/playlist?id=${playlist.id}&action=${checked ? "remove" : "add"}&track=${track.id}`,
			{
				method: "PUT",
			}
		);
		checkTrack();
	}
</script>

<tr class="flex items-center">
	<td>
		<Label.Root>{playlist.name}</Label.Root>
	</td>
	<td class="flex flex-1 justify-end">
		<Checkbox bind:checked onclick={handleClick} disabled={loading} />
	</td>
</tr>
