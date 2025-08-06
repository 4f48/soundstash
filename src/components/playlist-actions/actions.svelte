<script lang="ts">
	import Edit from "./edit.svelte";
	import AlertDialog from "@/components/alert-dialog.svelte";
	import Button from "@/components/button.svelte";
	import { queue, index } from "@/lib/stores";
	import { navigate } from "astro:transitions/client";
	import { Icon, Play, Trash } from "svelte-hero-icons";
	import { toast } from "svelte-sonner";

	interface Props {
		playlist: App.Playlist;
		tracks: App.Track[];
	}
	const { playlist, tracks }: Props = $props();

	function play(): void {
		$index = 0;
		$queue = tracks;
	}

	let deleteLoading = $state(false);
	async function del(): Promise<void> {
		deleteLoading = true;
		const result = await fetch(`/api/playlist?id=${playlist.id}`, {
			method: "DELETE",
		});
		if (result.ok) {
			toast.success(`Deleted playlist "${playlist.name}"`);
			navigate("/");
		} else toast.error(`Failed to delete playlist: ${await result.text()}`);
	}
</script>

<div class="my-2 flex gap-1">
	<Button disabled={tracks.length < 1} onclick={play}
		><Icon src={Play} solid />Play</Button
	>
	<Edit {playlist} />
	<AlertDialog>
		{#snippet trigger({ props })}
			<Button size="icon" variant="secondary" {...props}
				><Icon src={Trash} solid /></Button
			>
		{/snippet}
		{#snippet title()}Delete playlist{/snippet}
		{#snippet description()}Are you sure you want to delete "{playlist.name}"?
			This action cannot be undone.{/snippet}
		{#snippet action({ props })}
			<Button
				loading={deleteLoading}
				onclick={del}
				variant="destructive"
				{...props}>Delete</Button
			>
		{/snippet}
	</AlertDialog>
</div>
