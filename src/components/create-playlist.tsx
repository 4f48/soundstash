import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { navigate } from "astro:transitions/client";
import { LoaderCircle, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "svelte-sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty("You must name your playlist.").max(30),
});

export default function createPlaylist({
	count,
}: {
	count: number;
}): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		const request: App.NewPlaylistRequest = { name: values.name };
		const result = await fetch("/api/playlist/new", {
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		if (result.ok) {
			const id = await result.text();
			toast.success(`Created playlist "${values.name}"`);
			navigate(`/playlist/${id}`);
		}
		setLoading(false);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Card className="hover:bg-muted flex h-44.5 w-38.5 items-center justify-center duration-100">
					<CardContent className="flex size-32 flex-col items-center justify-center gap-0 px-0">
						<Plus />
						<span className="text-sm">Create playlist</span>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new playlist</DialogTitle>
					<DialogDescription>Let's name your new playlist.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel>Playlist name</FormLabel>
										<FormMessage className="flex-1 text-right" />
									</div>
									<FormControl>
										<Input
											placeholder={`My Playlist #${count + 1}`}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button className="w-full" disabled={loading} type="submit">
							{loading && <LoaderCircle className="animate-spin" />}
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
