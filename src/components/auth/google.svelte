<script lang="ts">
	import google from "@/assets/images/google.svg";
	import Button from "@/components/button.svelte";
	import { authClient } from "@/lib/auth/client";
	import type { EventHandler } from "svelte/elements";

	const onclick: EventHandler = async () => {
		await authClient.signIn.social({
			provider: "google",
		});
	};
</script>

<Button class="bg-white text-black hover:bg-gray-100" {onclick}>
	<img alt="google icon" class="size-4" src={google.src} />
	Google
</Button>
