<script lang="ts">
	import { Dialog, type WithoutChild } from "bits-ui";
	import type { Snippet } from "svelte";
	import { fade, scale } from "svelte/transition";

	interface Props extends Dialog.RootProps {
		contentProps?: WithoutChild<Dialog.ContentProps>;
		description: Snippet;
		title: Snippet;
		trigger?: Snippet<[{ props: Record<string, unknown> }]>;
	}
	let {
		children,
		contentProps,
		description,
		open = $bindable(false),
		title,
		trigger,
		...props
	}: Props = $props();
</script>

<Dialog.Root bind:open {...props}>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				{@render trigger({ props })}
			{/snippet}
		</Dialog.Trigger>
	{/if}
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ open, props })}
				{#if open}
					<div
						class="bg-fg0/50 fixed inset-0 z-50"
						{...props}
						transition:fade={{ duration: 100 }}
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount {...contentProps}>
			{#snippet child({ open, props })}
				{#if open}
					<div
						class="border-bg2 bg-bg w-sm fixed left-[50%] top-[50%] z-50 flex max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col gap-2 rounded-md border p-3"
						{...props}
						transition:scale={{
							duration: 100,
							start: 0.95,
						}}
					>
						<div class="mb-1 grid gap-0.5">
							<Dialog.Title
								class="text-lg font-semibold leading-none tracking-tight"
								>{@render title()}</Dialog.Title
							>
							<Dialog.Description class="text-fg1 text-sm"
								>{@render description()}</Dialog.Description
							>
						</div>
						{@render children?.()}
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
