<script lang="ts">
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
		<button
			class="hover:bg-bg1/50 flex h-15 w-full cursor-pointer items-center gap-2 rounded-md px-1.5"
			{...props}
		>
			<div class="bg-bg1 flex size-12 items-center justify-center rounded-sm">
				<Icon class="text-bg5 size-8" src={Plus} />
			</div>
			<div class="flex flex-1 flex-col items-start">
				<span>Create playlist</span>
				<span class="text-fg2 col-start-2 text-sm">Organize your tracks</span>
			</div>
		</button>
	{/snippet}
	{#snippet title()}Create new playlist{/snippet}
	{#snippet description()}Let's name your new playlist.{/snippet}
	<Form {n} />
</Dialog>
