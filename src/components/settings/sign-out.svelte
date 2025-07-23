<script lang="ts">
	import AlertDialog from "@/components/alert-dialog.svelte";
	import Button from "@/components/button.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { navigate } from "astro:transitions/client";

	let loading = $state(false);

	function signOut(): void {
		authClient.revokeOtherSessions();
		authClient.signOut(undefined, { onSuccess: () => navigate("/") });
	}
</script>

<AlertDialog>
	{#snippet trigger({ props })}
		<Button class="mt-2 w-fit" variant="destructive" {...props}>Sign out</Button
		>
	{/snippet}
	{#snippet title()}Sign out of all browsers{/snippet}
	{#snippet description()}Are you sure you want to sign out all browsers?{/snippet}
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
