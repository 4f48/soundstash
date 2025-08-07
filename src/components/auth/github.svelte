<script lang="ts">
	import Button from "@/components/button.svelte";
	import { authClient } from "@/lib/auth/client";
	import type { EventHandler } from "svelte/elements";

	const onclick: EventHandler = async () => {
		await authClient.signIn.social({
			provider: "github",
		});
	};
</script>

<Button class="bg-black hover:bg-gray-900" {onclick}>
	<div class="i-simple-icons:github"></div>
	GitHub
</Button>
