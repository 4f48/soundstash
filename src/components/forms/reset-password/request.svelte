<script lang="ts">
	import Formfield from "../formfield.svelte";
	import Button from "@/components/button.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { reporter } from "@felte/reporter-svelte";
	import { validator } from "@felte/validator-zod";
	import { createForm } from "felte";
	import { toast } from "sonner";
	import { object, string, type infer as zInfer } from "zod";

	const schema = object({
		email: string().nonempty("required").email("invalid email"),
	});
	type Schema = zInfer<typeof schema>;

	const { form, isSubmitting } = createForm<Schema>({
		extend: [reporter(), validator({ schema })],
		onSubmit: async (values) => {
			await authClient.requestPasswordReset(
				{
					email: values.email,
					redirectTo: "/auth/reset/complete",
				},
				{
					onSuccess: () => {
						toast.success(
							"We sent you an email with your password reset link."
						);
					},
					onError: ({ error }) => {
						toast.error(`Failed to sign in: ${error.message}`);
					},
				}
			);
		},
	});
</script>

<form class="flex flex-col gap-2" use:form>
	<Formfield name="Email" />
	<Button loading={$isSubmitting} type="submit">Send</Button>
</form>
