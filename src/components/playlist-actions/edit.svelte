<script lang="ts">
	import Input from "../input.svelte";
	import Button from "@/components/button.svelte";
	import Dialog from "@/components/dialog.svelte";
	import { navigate } from "astro:transitions/client";
	import { Avatar, Label, Separator } from "bits-ui";
	import { Icon, MusicalNote, Pencil } from "svelte-hero-icons";
	import { toast } from "svelte-sonner";
	import type { ChangeEventHandler } from "svelte/elements";

	interface Props {
		playlist: App.Playlist;
	}
	const { playlist }: Props = $props();

	let editingName = $state(false);
	let nameValue = $state(playlist.name);
	let uploading = $state(false);
	let renaming = $state(false);
	let nameError = $state<string | null>(null);

	const onchange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		try {
			const files = e.currentTarget.files;
			if (!files || files.length === 0) throw new Error("No files selected");
			const file = files.item(0);
			if (!file) throw new Error("Failed to get file");

			if (!file.type.startsWith("image/")) {
				toast.error("Please select a valid image file");
				e.currentTarget.value = "";
				return;
			}
			const MAX_SIZE = 10 * 1024 * 1024;
			if (file.size > MAX_SIZE) {
				toast.error("Image is too big. Maximum size is 10 MB");
				e.currentTarget.value = "";
				return;
			}

			uploading = true;

			const response = await fetch(
				`/api/playlist/image?id=${encodeURIComponent(String(playlist.id))}`,
				{
					body: file,
					headers: {
						"content-length": String(file.size),
						"content-type": file.type,
					},
					method: playlist.image !== null ? "PUT" : "POST",
				}
			);

			const etag = await response.text();

			if (response.ok) {
				if (etag && etag !== "") {
					const refreshCache = await fetch(
						`/api/playlist/image?id=${encodeURIComponent(String(playlist.id))}&etag=${encodeURIComponent(etag)}`,
						{ cache: "reload" }
					);
					if (!refreshCache.ok) {
						toast.error("Image uploaded, but failed to refresh cache");
					}
				}
				toast.success(`Updated image for ${playlist.name}`);
				navigate(`/playlist/${playlist.id}`);
			} else {
				const detail = etag || `HTTP ${response.status}`;
				toast.error(`Failed to update playlist image: ${detail}`);
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			console.error(message);
			toast.error(`Failed to update playlist image: ${message}`);
		} finally {
			uploading = false;
			if (e?.currentTarget) e.currentTarget.value = "";
		}
	};

	const toggleEditName = () => {
		editingName = !editingName;
		if (!editingName) {
			nameValue = playlist.name; // Reset to original name if canceling
			nameError = null;
		} else {
			nameError = null;
		}
	};

	const updateName = async () => {
		try {
			const next = nameValue.trim();
			nameError = null;

			if (next.length === 0) {
				nameError = "Name cannot be empty";
				toast.error("Please enter a playlist name");
				return;
			}
			if (next.length > 100) {
				nameError = "Name must be 100 characters or fewer";
				toast.error("Playlist name is too long");
				return;
			}
			if (next === playlist.name.trim()) {
				editingName = false;
				return;
			}

			renaming = true;

			const response = await fetch(
				`/api/playlist?id=${encodeURIComponent(String(playlist.id))}&action=rename&name=${encodeURIComponent(next)}`,
				{
					method: "PUT",
				}
			);

			if (response.ok) {
				playlist.name = next;
				editingName = false;
				toast.success(`Updated playlist name to "${next}"`);
				navigate(`/playlist/${playlist.id}`);
			} else {
				const detail = await response.text().catch(() => "");
				toast.error(
					`Failed to update playlist name${detail ? `: ${detail}` : ""}`
				);
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			console.error(message);
			toast.error(`Failed to update playlist name: ${message}`);
		} finally {
			renaming = false;
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
	<div class="grid w-full items-start gap-6 md:grid-cols-[auto,1fr]">
		<section class="flex flex-col items-center gap-3">
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
				class="text-fg2 cursor-pointer text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-60"
				for="image"
				aria-disabled={uploading}
				title={uploading ? "Uploading..." : undefined}
			>
				{playlist.image === null ? "Add" : "Change"} image
			</Label.Root>
			<input
				class="hidden"
				id="image"
				name="image"
				{onchange}
				type="file"
				accept="image/*"
				disabled={uploading}
			/>
		</section>
		<Separator.Root class="bg-fg2 h-[1px] w-full" />
		<div class="flex w-full flex-col gap-3">
			{#if editingName}
				<div class="flex flex-col gap-2">
					<Label.Root class="text-fg3 text-sm" for="playlist-name"
						>Name</Label.Root
					>
					<Input
						id="playlist-name"
						value={nameValue}
						oninput={(e) => (nameValue = e.currentTarget.value)}
						placeholder="Playlist name"
						maxlength={100}
						aria-invalid={!!nameError}
						aria-describedby="name-error"
						onkeydown={(e) => {
							if (e.key === "Enter") updateName();
							if (e.key === "Escape") toggleEditName();
						}}
					/>
					{#if nameError}
						<span id="name-error" class="text-sm text-red-500">{nameError}</span
						>
					{/if}
					<div class="flex justify-end gap-2">
						<Button variant="ghost" onclick={toggleEditName}>Cancel</Button>
						<Button
							onclick={updateName}
							disabled={renaming ||
								nameValue.trim().length === 0 ||
								nameValue.trim() === playlist.name.trim()}
						>
							Save
						</Button>
					</div>
				</div>
			{:else}
				<div class="flex items-start justify-between gap-4">
					<div class="min-w-0">
						<Label.Root class="text-fg3 text-sm">Name</Label.Root>
						<p class="truncate">{playlist.name}</p>
					</div>
					<Button variant="ghost" onclick={toggleEditName}>Edit name</Button>
				</div>
			{/if}
		</div>
	</div>
</Dialog>
