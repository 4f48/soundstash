<script lang="ts">
	import Item from "./dropdownitem.svelte";
	import { authClient } from "@/lib/auth/client";
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

	function getOpen(): boolean {
		return open;
	}
	function setOpen(value: boolean): void {
		open = value;
	}
</script>

<DropdownMenu.Root bind:open={getOpen, setOpen}>
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
			<Item href="/account"><Icon src={Cog} mini />Settings</Item>
			<Item
				onclick={() =>
					authClient.signOut(undefined, {
						onSuccess: () => navigate("/"),
					})}><Icon src={ArrowLeftStartOnRectangle} mini />Sign out</Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
