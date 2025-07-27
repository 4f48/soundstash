<script lang="ts">
	import { CheckCircle, ExclamationTriangle, Icon } from "svelte-hero-icons";
	import { Toaster } from "svelte-sonner";
</script>

<Toaster
	swipeDirections={["right", "bottom"]}
	toastOptions={{
		unstyled: true,
		class: "flex items-center font-medium text-sm p-4 gap-3 rounded-sm border",
		classes: {
			error: "bg-[#fb4934] border-[#cc241d]  text-bg0",
			success: "bg-[#b8bb26] border-[#98971a] text-fg",
		},
	}}
>
	{#snippet successIcon()}
		<Icon class="size-5" src={CheckCircle} solid />
	{/snippet}
	{#snippet errorIcon()}
		<Icon class="size-5" src={ExclamationTriangle} solid />
	{/snippet}
</Toaster>
