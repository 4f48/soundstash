<script lang="ts">
	import Formfield from "../formfield.svelte";
	import Button from "@/components/button.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { reporter } from "@felte/reporter-svelte";
	import { validator } from "@felte/validator-zod";
	import { navigate } from "astro:transitions/client";
	import { createForm } from "felte";
	import { toast } from "svelte-sonner";
	import { object, string, type infer as zInfer } from "zod";

	interface Props {
		token: string;
	}
	const { token }: Props = $props();

	const schema = object({
		password: string()
			.nonempty("required")
			.min(8, "must be at least 8 characters long")
			.regex(/\d/, "must have a digit")
			.regex(/[^a-zA-Z0-9]/, "must have a special character"),
	});
	type Schema = zInfer<typeof schema>;

	const { form, isSubmitting } = createForm<Schema>({
		extend: [reporter(), validator({ schema })],
		onSubmit: async (values) => {
			await authClient.resetPassword(
				{
					newPassword: values.password,
					token,
				},
				{
					onSuccess: () => {
						toast.success("Your password has been reset.");
						navigate("/auth/signin");
					},
					onError: ({ error }) => {
						toast.error(`Failed to create new password: ${error.message}`);
					},
				}
			);
		},
	});
</script>

<form class="flex flex-col gap-2" use:form>
	<Formfield name="Password" type="password" />
	<Button loading={$isSubmitting} type="submit">Confirm</Button>
</form>
