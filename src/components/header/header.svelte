<script lang="ts">
	import Button from "../button.svelte";
	import Link from "./link.svelte";
	import { NavigationMenu, Separator } from "bits-ui";
	import { Icon, Bars3, XMark } from "svelte-hero-icons";
	import { slide } from "svelte/transition";

	let open = $state(false);
</script>

<header class="fixed top-0 left-0 z-50 w-full p-2">
	<div class="bg-text/20 bg-bg border-bg2 relative rounded-lg border px-3">
		<div class="flex h-[2.9rem] items-center">
			<span class="text-xl font-bold tracking-tight sm:mx-3">SoundStash</span>
			<div class="flex flex-1 justify-end sm:hidden">
				<Button
					class="[&_svg]:size-7"
					onclick={() => (open = !open)}
					size="icon"
					variant="ghost"
				>
					{#if !open}
						<Icon src={Bars3} />
					{:else}
						<Icon src={XMark} />
					{/if}
				</Button>
			</div>
			<Separator.Root
				class="bg-bg2 mx-3 hidden h-8 w-[1px] shrink-0 p-0 sm:block"
				orientation="vertical"
			/>
			<NavigationMenu.Root class="hidden flex-1 sm:block">
				<NavigationMenu.List class="flex items-center justify-end gap-1">
					<div class="hidden flex-1 gap-1 sm:flex">
						<Link href="#features">Features</Link>
						<Link href="#pricing">Pricing</Link>
						<Link href="#faq">FAQ</Link>
					</div>
					<Link href="/auth/signup">Sign up</Link>
					<Link href="/auth/signin">Sign in</Link>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>

		{#if open}
			<div class="w-full pt-2 pb-3" transition:slide={{ duration: 200 }}>
				<NavigationMenu.Root>
					<NavigationMenu.List class="flex flex-col gap-1">
						<Link href="#features">Features</Link>
						<Link href="#pricing">Pricing</Link>
						<Link href="#faq">FAQ</Link>
						<Separator.Root class="bg-bg2 my-2 h-[1px] w-full shrink-0" />
						<Link href="/auth/signup">Sign up</Link>
						<Link href="/auth/signin">Sign in</Link>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>
		{/if}
	</div>
</header>
