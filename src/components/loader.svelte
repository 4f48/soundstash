<script lang="ts">
	import type { ClassValue } from "clsx";

	interface Props {
		class?: ClassValue;
	}
	const { class: className }: Props = $props();
</script>

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	fill="currentColor"
	class={className as string}
	><style>
		.spinner_S1WN {
			animation: spinner_MGfb 0.8s linear infinite;
			animation-delay: -0.8s;
		}
		.spinner_Km9P {
			animation-delay: -0.65s;
		}
		.spinner_JApP {
			animation-delay: -0.5s;
		}
		@keyframes spinner_MGfb {
			93.75%,
			100% {
				opacity: 0.2;
			}
		}
	</style><circle class="spinner_S1WN" cx="4" cy="12" r="3" /><circle
		class="spinner_S1WN spinner_Km9P"
		cx="12"
		cy="12"
		r="3"
	/><circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" /></svg
>
