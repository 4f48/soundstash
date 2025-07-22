<script lang="ts">
	import Delete from "./delete.svelte";
	import Button from "@/components/button.svelte";
	import Item from "@/components/dropdownitem.svelte";
	import { DropdownMenu } from "bits-ui";
	import {
		EllipsisHorizontal,
		Icon,
		ArchiveBox,
		Pencil,
		Trash,
	} from "svelte-hero-icons";

	interface Props {
		track: App.Track;
	}
	const { track }: Props = $props();

	let open = $state(false);
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
			<Item disabled><Icon src={Pencil} solid />Edit</Item>
			<Item disabled><Icon src={ArchiveBox} solid />Compress</Item>
			<Item onclick={() => (open = true)}><Icon src={Trash} solid />Delete</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
