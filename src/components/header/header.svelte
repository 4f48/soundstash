<script lang="ts">
	import Button from "../button.svelte";
	import Link from "./link.svelte";
	import { NavigationMenu, Separator } from "bits-ui";
	import { Icon, Bars3, XMark } from "svelte-hero-icons";
	import { slide } from "svelte/transition";

	let open = $state(false);
</script>

<header class="w-full fixed left-0 top-0 z-50 p-2">
	<div class="bg-text/20 bg-bg border border-bg2 rounded-lg px-3 relative">
		<div class="flex h-[2.9rem] items-center">
			<h1 class="text-xl sm:mx-3 font-bold tracking-tight">SoundStash</h1>
			<div class="flex-1 flex justify-end sm:hidden">
				<Button onclick={() => (open = !open)} size="icon" variant="ghost">
					<div class="size-7">
						{#if !open}
							<Icon src={Bars3} />
						{:else}
							<Icon src={XMark} />
						{/if}
					</div>
				</Button>
			</div>
			<Separator.Root
				class="bg-bg2 hidden sm:block p-0 mx-3 shrink-0 h-8 w-[1px]"
				orientation="vertical"
			/>
			<NavigationMenu.Root class="flex-1 hidden sm:block">
				<NavigationMenu.List class="flex items-center justify-end gap-1">
					<div class="flex-1 hidden gap-1 sm:flex">
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
						<Separator.Root class="bg-border my-2 shrink-0 w-full h-[1px]" />
						<Link href="/auth/signup">Sign up</Link>
						<Link href="/auth/signin">Sign in</Link>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>
		{/if}
	</div>
</header>
