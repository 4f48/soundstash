<script lang="ts">
	import Button from "@/components/button.svelte";
	import { AlertDialog, type WithoutChild } from "bits-ui";
	import type { Snippet } from "svelte";
	import { scale, fade } from "svelte/transition";

	interface Props extends AlertDialog.RootProps {
		action: Snippet<[{ props: Record<string, unknown> }]>;
		contentProps?: WithoutChild<AlertDialog.ContentProps>;
		description: Snippet;
		title: Snippet;
		trigger?: Snippet<[{ props: Record<string, unknown> }]>;
	}
	let {
		action,
		contentProps,
		description,
		open = $bindable(false),
		title,
		trigger,
		...props
	}: Props = $props();
</script>

<AlertDialog.Root bind:open {...props}>
	{#if trigger}
		<AlertDialog.Trigger>
			{#snippet child({ props })}
				{@render trigger({ props })}
			{/snippet}
		</AlertDialog.Trigger>
	{/if}
	<AlertDialog.Portal>
		<AlertDialog.Overlay forceMount>
			{#snippet child({ open, props })}
				{#if open}
					<div
						class="bg-fg0/50 fixed inset-0 z-50"
						{...props}
						transition:fade={{ duration: 100 }}
					></div>
				{/if}
			{/snippet}
		</AlertDialog.Overlay>
		<AlertDialog.Content forceMount {...contentProps}>
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
						<div class="mb-2 grid gap-0.5">
							<AlertDialog.Title
								class="text-lg font-semibold leading-none tracking-tight"
								>{@render title()}</AlertDialog.Title
							>
							<AlertDialog.Description class="text-fg1 text-sm"
								>{@render description()}</AlertDialog.Description
							>
						</div>
						<div class="grid grid-cols-2 gap-1">
							<AlertDialog.Action>
								{#snippet child({ props })}
									{@render action({ props })}
								{/snippet}
							</AlertDialog.Action>
							<AlertDialog.Cancel>
								{#snippet child({ props })}
									<Button class="shrink-0 grow-0" variant="secondary" {...props}
										>Cancel</Button
									>
								{/snippet}
							</AlertDialog.Cancel>
						</div>
					</div>
				{/if}
			{/snippet}
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
