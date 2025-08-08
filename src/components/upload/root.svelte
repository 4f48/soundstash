<script lang="ts">
	import Button from "../button.svelte";
	import { cn } from "@/lib/utils";
	import { navigate } from "astro:transitions/client";
	import { Label } from "bits-ui";
	import byteSize from "byte-size";
	import { parseBlob } from "music-metadata";
	import { Icon, FolderOpen } from "svelte-hero-icons";
	import { toast } from "svelte-sonner";
	import type { ChangeEventHandler } from "svelte/elements";
	import { SvelteURLSearchParams } from "svelte/reactivity";

	let loading = $state(false);

	const files: File[] = $state([]);
	const addFiles: ChangeEventHandler<HTMLInputElement> = (e) => {
		const fileList = e.currentTarget.files;
		if (!fileList) return;
		for (let i = 0; i < fileList.length; i++) {
			const file = fileList.item(i);
			if (!file) continue;
			files.push(file);
		}
	};

	function removeFile(file: File): void {
		const index = files.indexOf(file);
		if (index === -1) {
			console.error(`file "${file.name}" not present in list`);
			return;
		}
		files.splice(index, 1);
	}

	async function uploadTracks(): Promise<void> {
		loading = true;
		Promise.allSettled(
			files.map(async (file) => {
				const urlParams = new SvelteURLSearchParams();
				urlParams.append("length", String(file.size));
				urlParams.append("type", file.type);

				const urlResponse = await fetch(
					`/api/track/upload?${urlParams.toString()}`
				);
				if (!urlResponse.ok) {
					const response = await urlResponse.text();
					toast.error(`Failed to upload ${file.name}: ${response}`);
					throw new Error(`failed to upload ${file.name}: ${response}`);
				}
				const urlResponseBody =
					(await urlResponse.json()) as App.GetTrackUploadUrlResponse;

				const upload = await fetch(urlResponseBody.url, {
					body: file,
					headers: {
						"content-type": file.type,
						"content-length": String(file.size),
					},
					method: "PUT",
				});
				if (!upload.ok) {
					const response = await upload.text();
					toast.error(`Failed to upload ${file.name}: ${response}`);
					throw new Error(`failed to upload ${file.name}: ${response}`);
				}

				const metadata = await parseBlob(file, { duration: true });

				const registerTrackParams = new SvelteURLSearchParams();
				if (metadata.common.album)
					registerTrackParams.append("album", metadata.common.album);
				if (metadata.common.artist)
					registerTrackParams.append("artist", metadata.common.artist);
				if (metadata.common.title)
					registerTrackParams.append("title", metadata.common.title);
				if (metadata.format.duration)
					registerTrackParams.append(
						"length",
						String(metadata.format.duration)
					);
				registerTrackParams.append("size", String(file.size));

				const registerTrackResponse = await fetch(
					`/api/track/${urlResponseBody.id}?${registerTrackParams.toString()}`,
					{ method: "PUT" }
				);
				if (!registerTrackResponse.ok) {
					const response = await registerTrackResponse.text();
					toast.error(
						`Failed to register ${metadata.common.title}: ${response}`
					);
					throw new Error(
						`failed to register ${metadata.common.title} to the db: ${response}`
					);
				}

				const covers = metadata.common.picture;
				if (covers) {
					const addCoverResponse = await fetch(
						`/api/track/cover/${urlResponseBody.id}`,
						{
							body: covers[0].data,
							headers: {
								"content-type": covers[0].format,
							},
							method: "PUT",
						}
					);
					if (!addCoverResponse.ok) {
						const response = await addCoverResponse.text();
						toast.error(
							`Failed to upload album cover for ${metadata.common.title}`
						);
						throw new Error(
							`failed to upload album cover for ${metadata.common.title}: ${response}`
						);
					}
				}
			})
		).then((results) => {
			loading = false;
			const fulfilled = results.filter(({ status }) => status === "fulfilled");
			const rejected = results.filter(({ status }) => status === "rejected");
			if (fulfilled.length > 0)
				toast.success(
					`Uploaded ${fulfilled.length} track${fulfilled.length > 1 ? "s" : ""}`
				);
			if (rejected.length === 0) navigate("/storage");
		});
	}
</script>

<div class="mt-3 min-w-0">
	{#if files.length < 1}
		<Label.Root
			class="border-bg3 hover:bg-bg1/35 text-bg5 flex cursor-pointer flex-col items-center rounded-md border border-dashed p-2 text-sm"
			for="adder"
			tabindex={0}
		>
			<Icon class="size-8" src={FolderOpen} />
			<span>Drop files here or</span>
			<span class="underline">click to browse</span>
		</Label.Root>
	{:else}
		<div class="max-h-48 overflow-y-auto">
			<ol class="min-w-0 space-y-1">
				{#each files as file (file.name)}
					<li class="flex min-w-0 items-center gap-1">
						<span
							class="bg-primary text-bg0 select-none text-nowrap rounded-sm p-0.5 text-xs font-semibold tabular-nums"
							>{byteSize(file.size, { precision: 1 })}</span
						>
						<button
							aria-label="remove {file.name} from list"
							class="enabled:hover:text-destructive truncate enabled:cursor-pointer"
							disabled={loading}
							onclick={() => removeFile(file)}>{file.name}</button
						>
					</li>
				{/each}
			</ol>
		</div>
		<div class="w-full text-center">
			<Label.Root
				class={cn(
					"text-sm underline",
					loading ? "text-fg2/50" : "text-fg2 cursor-pointer"
				)}
				for={loading ? "" : "adder"}
				tabindex={0}>Add more</Label.Root
			>
		</div>
	{/if}
</div>
<input
	accept="audio/*"
	class="hidden"
	id="adder"
	multiple
	onchange={addFiles}
	type="file"
/>
<Button
	class="mt-3"
	disabled={files.length < 1 || loading}
	{loading}
	onclick={uploadTracks}>Upload</Button
>
