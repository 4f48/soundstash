<script lang="ts">
	import type { track as trackTable } from "@/lib/schema";
	import { Avatar } from "bits-ui";
	import { Icon, MusicalNote } from "svelte-hero-icons";

	interface Props {
		track: typeof trackTable.$inferSelect;
	}
	const { track }: Props = $props();
</script>

<div class="flex items-center gap-1">
	<Avatar.Root class="shrink-0">
		{#if track.cover}
			<Avatar.Image
				alt="{track.album || track.title} {track.album && 'album'} cover"
				class="size-10 rounded-sm"
				draggable={false}
				src="/api/track/cover/{track.id}"
			/>
		{/if}
		<Avatar.Fallback
			class="bg-bg1 flex size-10 items-center justify-center rounded-sm"
		>
			<Icon class="text-bg5 size-8" src={MusicalNote} />
		</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex min-w-0 flex-col">
		<span class="truncate">{track.title}</span>
		<span class="text-fg2 truncate text-sm">{track.artist}</span>
	</div>
</div>
