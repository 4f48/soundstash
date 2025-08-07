<script lang="ts">
	import Button from "@/components/button.svelte";
	import { authClient } from "@/lib/auth/client";
	import { Icon, Pencil } from "svelte-hero-icons";
	import { toast } from "svelte-sonner";

	interface Props {
		email: string;
	}
	const { email }: Props = $props();

	let loading = $state(false);

	function requestReset(): void {
		loading = true;
		authClient.requestPasswordReset(
			{
				email,
				redirectTo: "/auth/reset/complete",
			},
			{
				onResponse: () => {
					loading = false;
				},
				onSuccess: () => {
					toast.success(`We sent an email to ${email} with your reset link`);
				},
				onError: () => {
					toast.error(`Failed to send reset email to: ${email}`);
				},
			}
		);
	}
</script>

<Button
	class="w-42 mt-3"
	disabled={loading}
	{loading}
	onclick={requestReset}
	variant="secondary"
>
	<Icon src={Pencil} solid />
	Change password
</Button>
