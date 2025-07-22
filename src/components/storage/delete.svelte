<script lang="ts">
	import Button from "../button.svelte";
	import AlertDialog from "@/components/alert-dialog.svelte";
	import { navigate } from "astro:transitions/client";
	import byteSize from "byte-size";

	interface Props {
		open: boolean;
		track: App.Track;
	}
	let { open = $bindable(), track }: Props = $props();

	let loading = $state(false);
	async function deleteTrack(): Promise<void> {
		loading = true;
		await fetch(`/api/track/${track.id}`, {
			method: "DELETE",
		});
		navigate("/storage");
	}
</script>

<AlertDialog bind:open>
	{#snippet title()}Delete {track.title}{/snippet}
	{#snippet description()}This action is permanent and cannot be undone. This
		will free up {byteSize(track.size)} of storage.{/snippet}
	{#snippet action({ props })}
		<Button
			class="shrink-0 grow-0"
			disabled={loading}
			{loading}
			onclick={deleteTrack}
			variant="destructive"
			{...props}>Delete</Button
		>
	{/snippet}
</AlertDialog>
