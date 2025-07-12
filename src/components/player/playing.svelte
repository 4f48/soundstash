<script lang="ts">
	import { index, playlist } from "@/lib/stores";
	import { Avatar } from "bits-ui";
	import { Icon, MusicalNote } from "svelte-hero-icons";

	const track = $derived($playlist[$index]);
</script>

<div class="flex items-center gap-2">
	<Avatar.Root class="shrink-0">
		<Avatar.Image
			alt="{track?.title} album cover"
			class="size-12 rounded-sm"
			draggable={false}
			src="/api/track/cover/{track?.id}"
		/>
		<Avatar.Fallback>
			<div class="bg-bg1 flex size-12 items-center justify-center rounded-sm">
				<Icon class="text-bg5 size-8" src={MusicalNote} />
			</div>
		</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex min-w-0 flex-col">
		<span class="truncate">{track?.title}</span>
		<span class="text-fg2 truncate text-sm">{track?.artist}</span>
	</div>
</div>
