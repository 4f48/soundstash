<script lang="ts">
	import Link from "./link.svelte";
	import { Separator, NavigationMenu } from "bits-ui";

	interface Props {
		authenticated: boolean;
	}
	const { authenticated }: Props = $props();
</script>

<header class="flex items-center w-full h-12 bg-muted border-b px-3">
	<h1 class="text-xl mx-3 font-bold tracking-tight">SoundStash</h1>
	<Separator.Root
		class={`bg-border p-0 mx-3 shrink-0 h-8 w-[1px] ${!authenticated && "hidden sm:block"}`}
		orientation="vertical"
	/>
	<NavigationMenu.Root class="flex-1">
		<NavigationMenu.List class="flex items-center justify-end gap-1">
			{#if authenticated}
				<div class="flex-1 flex gap-1">
					<Link href="/">Library</Link>
					<Link href="/storage">Storage</Link>
				</div>
				<Link href="/account" class="sm:flex hidden">Account</Link>
			{:else}
				<div class="flex-1 hidden gap-1 sm:flex">
					<Link href="#features">Features</Link>
					<Link href="#pricing">Pricing</Link>
					<Link href="#faq">FAQ</Link>
				</div>
				<Link href="/auth/signup">Sign up</Link>
				<Link href="/auth/signin">Sign in</Link>
			{/if}
		</NavigationMenu.List>
	</NavigationMenu.Root>
</header>
