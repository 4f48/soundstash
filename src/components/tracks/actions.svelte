<script lang="ts">
	import Button from "@/components/button.svelte";
	import Item from "@/components/dropdownitem.svelte";
	import type { track as trackTable } from "@/lib/schema";
	import { queue } from "@/lib/stores";
	import { DropdownMenu } from "bits-ui";
	import ListPlus from "phosphor-svelte/lib/ListPlus";
	import Plus from "phosphor-svelte/lib/Plus";
	import { EllipsisHorizontal, Icon } from "svelte-hero-icons";

	interface Props {
		track: typeof trackTable.$inferSelect;
	}
	const { track }: Props = $props();

	function addToQueue(): void {
		$queue = [...$queue, track];
	}
</script>

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
			<Item onclick={() => console.debug("add to playlist")}
				><Plus />Add to playlist</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
