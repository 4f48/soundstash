<script lang="ts">
	import AlertDialog from "../alert-dialog.svelte";
	import Button from "../button.svelte";
	import Item from "@/components/dropdownitem.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { navigate } from "astro:transitions/client";
	import { DropdownMenu } from "bits-ui";
	import {
		ArrowLeftStartOnRectangle,
		ChevronUpDown,
		Cog,
		Icon,
		Server,
		User,
	} from "svelte-hero-icons";

	interface Props {
		email: string;
	}
	const { email }: Props = $props();

	let open = $state(false);
	let loading = $state(false);
	function signOut(): void {
		loading = true;
		authClient.signOut(undefined, {
			onSuccess: () => navigate("/"),
		});
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="hover:bg-bg1/50 flex w-full cursor-pointer items-center gap-3 rounded-md p-2"
	>
		<div class="bg-bg1 border-bg3 rounded-full border p-2">
			<Icon class="text-bg5 size-6" src={User} />
		</div>
		<div class="flex min-w-0 flex-1 flex-col items-start text-sm font-normal">
			<span>Account</span>
			<span class="text-fg2 max-w-full grow-0 truncate">{email}</span>
		</div>
		<Icon class="size-6 shrink-0" src={ChevronUpDown} />
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="bg-bg1 text-fg border-bg2 flex w-58 flex-col rounded-sm border p-1"
		>
			<Item href="/storage"><Icon src={Server} mini />Manage storage</Item>
			<Item href="/settings"><Icon src={Cog} mini />Settings</Item>
			<Item onclick={() => (open = true)}
				><Icon src={ArrowLeftStartOnRectangle} mini />Sign out</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>

<AlertDialog bind:open>
	{#snippet title()}Sign out{/snippet}
	{#snippet description()}Are you sure you want to sign out?{/snippet}
	{#snippet action({ props })}
		<Button
			disabled={loading}
			{loading}
			onclick={signOut}
			variant="destructive"
			{...props}>Sign out</Button
		>
	{/snippet}
</AlertDialog>
