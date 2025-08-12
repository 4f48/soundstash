<script lang="ts">
	import Delete from "./delete.svelte";
	import Button from "@/components/button.svelte";
	import Item from "@/components/dropdownitem.svelte";
	import { DropdownMenu } from "bits-ui";
	import {
		EllipsisHorizontal,
		Icon,
		Pencil,
		Trash,
		FolderArrowDown,
	} from "svelte-hero-icons";

	interface Props {
		track: App.Track;
	}
	const { track }: Props = $props();

	let open = $state(false);

	async function download() {
		try {
			const urlResult = await fetch(`/api/track/${track.id}`);
			if (!urlResult.ok) return;
			const url = await urlResult.text();
			if (!url) return;

			const fileResult = await fetch(url);
			if (!fileResult.ok) return;

			const blob = await fileResult.blob();
			const a = document.createElement("a");

			const artist = track.artist ? `${track.artist} - ` : "";
			const title = track.title ?? track.id;
			a.download = `${artist}${title}`.replace(/[\\/:*?"<>|]+/g, "_");
			a.href = URL.createObjectURL(blob);
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(a.href);
		} catch (e) {
			if (e instanceof Error)
				console.error(`failed to download ${track.title}: ${e.message}`);
			else console.error("something went wrong: ", e);
		}
	}
</script>

<Delete bind:open {track} />
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
			<Item onclick={download}
				><Icon src={FolderArrowDown} solid />Download</Item
			>
			<Item onclick={() => (open = true)}><Icon src={Trash} solid />Delete</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
