<script lang="ts">
	import { cn } from "../lib/utils";
	import Loader from "./loader.svelte";
	import { Button } from "bits-ui";
	import { cva, type VariantProps } from "class-variance-authority";
	import type { Snippet } from "svelte";

	const buttonVariants = cva(
		"focus-visible:ring-bg4/50 inline-flex cursor-pointer items-center justify-center rounded-sm text-sm font-medium transition-colors duration-150 focus-visible:ring-[2.5px] focus-visible:outline-none disabled:opacity-75",
		{
			variants: {
				size: {
					sm: "h-8 gap-1.5 px-3 has-[div[class*='i-']]:px-2.5 [&_div[class*='i-']]:text-base",
					lg: "h-10 gap-2 px-6 has-[div[class*='i-']]:px-4 [&_div[class*='i-']]:text-lg",
					icon: "size-8",
				},
				variant: {
					default: "bg-primary text-bg enabled:hover:bg-primary/95",
					outline:
						"border-primary text-foreground enabled:hover:bg-primary/20 border",
					ghost: "text-foreground enabled:hover:bg-muted-background",
					destructive:
						"bg-destructive text-foreground enabled:hover:bg-destructive/80",
				},
			},
			defaultVariants: {
				size: "sm",
				variant: "default",
			},
		}
	);

	type Props = {
		children: Snippet;
		loading?: boolean;
	} & Button.RootProps &
		VariantProps<typeof buttonVariants>;
	const {
		children,
		class: className,
		loading = false,
		size,
		variant,
		...props
	}: Props = $props();
</script>

<Button.Root
	class={cn(buttonVariants({ className, size, variant }))}
	disabled={loading}
	{...props}
	>{#if loading}<Loader class="text-bg" />
	{:else}{@render children()}{/if}</Button.Root
>
