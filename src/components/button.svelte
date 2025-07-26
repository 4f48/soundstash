<script lang="ts">
	import { cn } from "../lib/utils";
	import Loader from "./loader.svelte";
	import { Button } from "bits-ui";
	import { cva, type VariantProps } from "class-variance-authority";
	import type { Snippet } from "svelte";

	const buttonVariants = cva(
		"focus-visible:ring-bg4/50 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-sm font-medium text-nowrap transition-colors duration-150 focus-visible:ring-[2.5px] focus-visible:outline-none disabled:cursor-default disabled:cursor-not-allowed [&_svg]:size-4",
		{
			variants: {
				size: {
					sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg]:size-4",
					lg: "h-10 gap-2 px-6 has-[div[class*='i-']]:px-4 [&_div[class*='i-']]:text-lg",
					icon: "size-8",
				},
				variant: {
					default:
						"bg-primary text-bg hover:bg-primary/95 disabled:hover:bg-primary disabled:opacity-75",
					secondary:
						"bg-bg1 text-fg hover:bg-bg2 hover:text-fg0 disabled:hover:text-fg disabled:hover:bg-bg1 disabled:opacity-75",
					outline:
						"border-bg3 disabled:border-bg3/75 disabled:text-fg/75 disabled:bg-bg1/25 text-fg enabled:hover:bg-bg border bg-transparent",
					ghost:
						"text-fg hover:bg-bg1/50 disabled:opacity-75 disabled:hover:bg-transparent",
					destructive: "bg-destructive text-bg enabled:hover:bg-destructive/80",
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
	draggable={false}
	disabled={loading}
	{...props}
	>{#if loading}<Loader />
	{:else}{@render children()}{/if}</Button.Root
>
