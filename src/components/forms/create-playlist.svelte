<script lang="ts">
	import Formfield from "./formfield.svelte";
	import Button from "@/components/button.svelte";
	import { reporter } from "@felte/reporter-svelte";
	import { validator } from "@felte/validator-zod";
	import { navigate } from "astro:transitions/client";
	import { createForm } from "felte";
	import { toast } from "svelte-sonner";
	import { object, string, type infer as zInfer } from "zod";

	interface Props {
		n: number;
	}
	const { n }: Props = $props();

	const schema = object({
		name: string(),
	});
	type Schema = zInfer<typeof schema>;

	const { form, isSubmitting } = createForm<Schema>({
		extend: [reporter(), validator({ schema })],
		initialValues: {
			name: `New Playlist #${n + 1}`,
		},
		onSubmit: async (values) => {
			const name = encodeURIComponent(values.name);
			const result = await fetch(`/api/playlist?name=${name}`, {
				method: "POST",
			});

			const response = await result.text();
			if (result.ok) {
				toast.success(`Created playlist "${values.name}"`);
				navigate(`/playlist/${response}`);
			} else toast.error(`Failed to create playlist: ${response}`);
		},
	});
</script>

<form class="flex flex-col gap-2" use:form>
	<Formfield focusSelect name="Name" placeholder="New Playlist #{n + 1}" />
	<Button loading={$isSubmitting} type="submit">Create</Button>
</form>
