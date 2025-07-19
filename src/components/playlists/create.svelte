<script lang="ts">
	import * as Card from "@/components/card";
	import Dialog from "@/components/dialog.svelte";
	import Form from "@/components/forms/create-playlist.svelte";
	import { Icon, Plus } from "svelte-hero-icons";

	interface Props {
		n: number;
	}
	const { n }: Props = $props();
</script>

<Dialog>
	{#snippet trigger({ props })}
		<button {...props}>
			<Card.Root class="hover:bg-bg1/50 cursor-pointer flex-row items-center">
				<div class="bg-bg1 flex size-8 items-center justify-center rounded-sm">
					<Icon class="text-bg5 size-5" src={Plus} />
				</div>
				<span class="text-fg1 truncate">Create playlist</span>
			</Card.Root>
		</button>
	{/snippet}
	{#snippet title()}
		Create new playlist
	{/snippet}
	{#snippet description()}
		Let's name your new playlist.
	{/snippet}
	<Form {n} />
</Dialog>
