<script lang="ts">
	import { cn } from "../lib/utils";
	import Loader from "./loader.svelte";
	import { Button } from "bits-ui";
	import { cva, type VariantProps } from "class-variance-authority";
	import type { Snippet } from "svelte";

	const buttonVariants = cva(
		"focus-visible:ring-bg4/50 inline-flex cursor-pointer items-center justify-center rounded-sm text-sm font-medium transition-colors duration-150 focus-visible:ring-[2.5px] focus-visible:outline-none disabled:cursor-default disabled:opacity-75 [&_svg]:size-4",
		{
			variants: {
				size: {
					sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg]:size-4",
					lg: "h-10 gap-2 px-6 has-[div[class*='i-']]:px-4 [&_div[class*='i-']]:text-lg",
					icon: "size-8",
				},
				variant: {
					default: "bg-primary text-bg enabled:hover:bg-primary/95",
					secondary:
						"bg-bg1 text-fg hover:bg-bg2 hover:text-fg0 disabled:hover:text-fg disabled:hover:bg-bg1",
					outline: "border-primary text-fg enabled:hover:bg-bg bg-bg0 border",
					ghost: "text-fg hover:bg-bg1/50 disabled:hover:bg-transparent",
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
	draggable={false}
	disabled={loading}
	{...props}
	>{#if loading}<Loader class="text-bg" />
	{:else}{@render children()}{/if}</Button.Root
>
