<script lang="ts">
	import Input from "@/components/input.svelte";
	import Label from "@/components/label.svelte";
	import { ValidationMessage } from "@felte/reporter-svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
		name: string;
		focusSelect?: boolean;
	}
	const { name, focusSelect, ...props }: Props = $props();
</script>

<div class="grid items-center">
	<div class="flex items-center">
		<Label for={name.toLowerCase()}>{name}</Label>
		<ValidationMessage for={name.toLowerCase()} let:messages={message}>
			<p class="text-destructive flex-1 text-end text-sm font-medium">
				{message && message[0]}
			</p>
		</ValidationMessage>
	</div>
	<Input
		{focusSelect}
		id={name.toLowerCase()}
		name={name.toLowerCase()}
		{...props}
	/>
</div>
