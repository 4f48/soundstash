<script lang="ts">
	import Input from "../input.svelte";
	import Button from "@/components/button.svelte";
	import Dialog from "@/components/dialog.svelte";
	import { navigate } from "astro:transitions/client";
	import { Avatar, Label } from "bits-ui";
	import { Check, Icon, MusicalNote, Pencil } from "svelte-hero-icons";
	import { toast } from "svelte-sonner";
	import type { ChangeEventHandler } from "svelte/elements";

	interface Props {
		playlist: App.Playlist;
	}
	const { playlist }: Props = $props();

	let editingName = $state(false);
	let nameValue = $state(playlist.name);

	const onchange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		try {
			const files = e.currentTarget.files;
			if (!files) throw new Error("got no files");
			const file = files.item(0);
			if (!file) throw new Error("failed to get file");

			const response = await fetch(`/api/playlist/image?id=${playlist.id}`, {
				body: new Blob([file]),
				headers: {
					"content-length": String(file.size),
					"content-type": file.type,
				},
				method: playlist.image !== null ? "put" : "post",
			});
			const etag = await response.text();
			if (etag !== "") {
				const refreshCache = await fetch(
					`/api/playlist/image?id=${playlist.id}&etag=${etag}`,
					{
						cache: "reload",
					}
				);
				if (refreshCache.ok) {
					toast.success(`Updated image for ${playlist.name}`);
					navigate(`/playlist/${playlist.id}`);
				} else toast.error("Failed to update playlist image");
			} else if (response.ok) {
				toast.success(`Updated image for ${playlist.name}`);
				navigate(`/playlist/${playlist.id}`);
			} else toast.error("Failed to update playlist image");
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			else console.error("something went wrong");
		}
	};

	const toggleEditName = () => {
		editingName = !editingName;
		if (!editingName) {
			nameValue = playlist.name; // Reset to original name if canceling
		}
	};

	const updateName = async () => {
		try {
			const response = await fetch(
				`/api/playlist?id=${playlist.id}&action=rename&name=${nameValue}`,
				{
					method: "PUT",
				}
			);

			if (response.ok) {
				playlist.name = nameValue;
				editingName = false;
				toast.success(`Updated playlist name to "${nameValue}"`);
				navigate(`/playlist/${playlist.id}`);
			} else {
				toast.error("Failed to update playlist name");
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			else console.error("something went wrong");
			toast.error("Failed to update playlist name");
		}
	};
</script>

<Dialog>
	{#snippet trigger({ props })}
		<Button size="icon" variant="secondary" {...props}
			><Icon src={Pencil} solid /></Button
		>
	{/snippet}
	{#snippet title()}Edit playlist{/snippet}
	{#snippet description()}Manage the name and image of {playlist.name}.{/snippet}
	<div class="flex flex-col items-center">
		<section class="text-center">
			<Avatar.Root class="*:size-32 *:rounded-sm">
				<Avatar.Fallback class="bg-bg1 flex items-center justify-center">
					<Icon class="text-bg5 size-8" src={MusicalNote} />
				</Avatar.Fallback>
				{#if playlist.image !== null}
					<Avatar.Image
						alt="{playlist.name} playlist cover"
						draggable={false}
						src="/api/playlist/image?id={playlist.id}"
					/>
				{/if}
			</Avatar.Root>
			<Label.Root
				class="text-fg2 cursor-pointer text-sm hover:underline"
				for="image"
				>{playlist.image === null ? "add" : "change"} image</Label.Root
			>
			<input class="hidden" id="image" name="image" {onchange} type="file" />
		</section>
		<div class="mt-4 flex items-center gap-2">
			{#if editingName}
				<Input
					value={nameValue}
					oninput={(e) => (nameValue = e.currentTarget.value)}
					placeholder="Playlist name"
				/>
				<Button size="icon" variant="ghost" onclick={updateName}
					><Icon src={Check} mini /></Button
				>
			{:else}
				<span class="flex-1 text-left">{playlist.name}</span>
				<Button size="icon" variant="ghost" onclick={toggleEditName}
					><Icon src={Pencil} solid /></Button
				>
			{/if}
		</div>
	</div>
</Dialog>
