<script lang="ts">
	import Button from "./button.svelte";
	import Input from "./input.svelte";
	import Label from "./label.svelte";
	import { newAuthClient as authClient } from "@/lib/auth/client";
	import { reporter, ValidationMessage } from "@felte/reporter-svelte";
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
	<div class="grid">
		<div class="flex items-center">
			<Label for="email">Email</Label>
			<ValidationMessage for="email" let:messages={message}>
				<p class="text-destructive flex-1 text-end text-sm font-medium">
					{message && message[0]}
				</p>
			</ValidationMessage>
		</div>
		<Input id="email" name="email" />
	</div>
	<div class="grid">
		<div class="flex items-center">
			<Label for="password">Password</Label>
			<ValidationMessage for="password" let:messages={message}>
				<p class="text-destructive flex-1 text-end text-sm font-medium">
					{message && message[0]}
				</p>
			</ValidationMessage>
		</div>
		<Input id="password" type="password" name="password" />
	</div>
	<Button loading={$isSubmitting} type="submit">Sign in</Button>
</form>
<span class="text-fg1 text-center text-sm [&_a]:underline">
	<a href="/auth/reset">Forgot your password?</a>
	&bull;
	<a href="/auth/signup">Sign up</a>
</span>
