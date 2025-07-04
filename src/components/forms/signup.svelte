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
		name: string().nonempty("required"),
		email: string().nonempty("required").email("invalid email"),
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
			await authClient.signUp.email(
				{
					name: values.name,
					email: values.email,
					password: values.password,
				},
				{
					onSuccess: () => {
						toast.success(
							"Your account has been registered. Verify your email before signing in."
						);
						navigate("/auth/signin");
					},
					onError: ({ error }) => {
						toast.error(`Failed to sign up: ${error.message}`);
					},
				}
			);
		},
	});
</script>

<form class="flex flex-col gap-2" use:form>
	<Formfield name="Name" />
	<Formfield name="Email" />
	<Formfield name="Password" type="password" />
	<Button loading={$isSubmitting} type="submit">Sign up</Button>
</form>
<span class="text-fg1 text-center text-sm [&_a]:underline">
	Already have an account?
	<a href="/auth/signin">Sign in</a>
</span>
