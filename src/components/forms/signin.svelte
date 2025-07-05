<script lang="ts">
	import Formfield from "./formfield.svelte";
	import Button from "@/components/button.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { reporter } from "@felte/reporter-svelte";
	import { validator } from "@felte/validator-zod";
	import { navigate } from "astro:transitions/client";
	import { createForm } from "felte";
	import { toast } from "sonner";
	import { object, string, type infer as zInfer } from "zod";

	const schema = object({
		email: string().nonempty("required").email("invalid email"),
		password: string().nonempty("required"),
	});
	type Schema = zInfer<typeof schema>;

	const { form, isSubmitting } = createForm<Schema>({
		extend: [reporter(), validator({ schema })],
		onSubmit: async (values) => {
			await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					rememberMe: true,
				},
				{
					onSuccess: () => {
						navigate("/");
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
	<Formfield name="Password" type="password" />
	<Button loading={$isSubmitting} type="submit">Sign in</Button>
</form>
