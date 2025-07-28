<script lang="ts">
	import AccordionItem from "./item.svelte";
	import { Accordion, type WithoutChildrenOrChild } from "bits-ui";

	let {
		value = $bindable(),
		ref = $bindable(null),
		items,
		...props
	}: WithoutChildrenOrChild<Accordion.RootProps> & {
		items: App.AccordionItem[];
	} = $props();
</script>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<Accordion.Root
	bind:value
	bind:ref
	class="flex flex-col gap-2"
	{...props as any}
>
	{#each items as item, i (item.title + i)}
		<AccordionItem {...item} />
	{/each}
</Accordion.Root>
