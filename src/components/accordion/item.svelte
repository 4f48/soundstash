<script lang="ts">
	import { Accordion, type WithoutChildrenOrChild } from "bits-ui";
	import { ChevronDown, Icon } from "svelte-hero-icons";
	import { slide } from "svelte/transition";

	interface Props extends WithoutChildrenOrChild<Accordion.ItemProps> {
		content: string;
		title: string;
	}
	let { content, title, ...props }: Props = $props();
</script>

<Accordion.Item class="border-bg2 bg-bg rounded-lg border" {...props}>
	<Accordion.Header>
		<Accordion.Trigger
			class="flex w-full cursor-pointer p-6 font-medium [&[data-state=open]>svg]:rotate-180"
		>
			<p class="flex flex-1">{title}</p>
			<Icon class="size-6" src={ChevronDown} />
		</Accordion.Trigger>
	</Accordion.Header>
	<Accordion.Content class="text-fg1 px-6 pb-6 text-justify" forceMount>
		{#snippet child({ open, props })}
			{#if open}
				<div transition:slide={{ duration: 200 }} {...props}>
					{content}
				</div>
			{/if}
		{/snippet}
	</Accordion.Content>
</Accordion.Item>
