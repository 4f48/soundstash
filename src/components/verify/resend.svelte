<script lang="ts">
	import Button from "@/components/button.svelte";
	import { authClient } from "@/lib/auth/client";
	import { onMount } from "svelte";
	import { toast } from "svelte-sonner";

	interface Props {
		email: string;
	}
	const { email }: Props = $props();

	let timer = $state(5);
	let wait = $state(true);

	onMount(() => {
		const interval = setInterval(() => timer--, 1000);
		setTimeout(() => {
			wait = false;
			timer = 0;
			clearInterval(interval);
		}, 5000);
	});

	function resendVerificationEmail(): void {
		authClient.sendVerificationEmail(
			{
				email,
				callbackURL: "/settings",
			},
			{
				onSuccess: () => {
					toast.success(`Sent verification link to ${email}`);
				},
				onError: ({ error }) => {
					toast.error(`Failed to send verification link: ${error.message}`);
				},
			}
		);
	}
</script>

<Button
	class="flex-1"
	disabled={wait}
	onclick={resendVerificationEmail}
	variant="secondary"
>
	Resend email
	{#if timer > 0}
		({timer})
	{/if}
</Button>
