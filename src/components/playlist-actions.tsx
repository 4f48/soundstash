import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { playlist as playlistTable } from "@/lib/schema";
import { playPlaylist, playPlaylistShuffled } from "@/lib/utils";
import { navigate } from "astro:transitions/client";
import {
	Image,
	ImageMinus,
	ImagePlus,
	LoaderCircle,
	MoreHorizontal,
	Pencil,
	Play,
	Shuffle,
	TextCursorInput,
	Trash2,
} from "lucide-react";
import React from "react";

export default function PlaylistActions({
	playlist,
}: {
	playlist: typeof playlistTable.$inferSelect;
}): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const [image, setImage] = React.useState<File | undefined>(undefined);
	const [open, setOpen] = React.useState(false);
	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		event.preventDefault();
		if (!image) return;

		try {
			await fetch(`/api/playlist/image?id=${playlist.id}`, {
				body: new Blob([image]),
				headers: {
					"Content-Type": image.type,
					"Content-Length": image.size.toString(),
				},
				method: playlist.image ? "PUT" : "POST",
			});
		} catch (e) {
			setLoading(false);
			if (e instanceof Error) console.error(e.message);
			return 1;
		} finally {
			setLoading(false);
			setOpen(false);
			if (!playlist.image) navigate(`/playlist/${playlist.id}`);
		}
	}
	async function removeImage() {
		await fetch(`/api/playlist/image?id=${playlist.id}`, {
			method: "DELETE",
		});
		navigate(`/playlist/${playlist.id}`);
	}
	return (
		<div className="grid grid-cols-3 w-fit border rounded-md shadow-xs">
			<Button
				onClick={() => playPlaylist(playlist)}
				size="icon"
				variant="ghost"
			>
				<Play />
			</Button>
			<Button
				onClick={() => playPlaylistShuffled(playlist)}
				size="icon"
				variant="ghost"
			>
				<Shuffle />
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="icon" variant="ghost">
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Manage Playlist</DropdownMenuLabel>
						<DropdownMenuGroup>
							{playlist.image ? (
								<DropdownMenuSub>
									<DropdownMenuSubTrigger className="[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground gap-2">
										<Image />
										Image
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DialogTrigger className="w-full">
												<DropdownMenuItem>
													<Pencil />
													Change
												</DropdownMenuItem>
											</DialogTrigger>
											<DropdownMenuItem onClick={() => removeImage()}>
												<ImageMinus />
												Remove
											</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							) : (
								<DialogTrigger className="w-full">
									<DropdownMenuItem>
										<ImagePlus />
										Add image
									</DropdownMenuItem>
								</DialogTrigger>
							)}
							<DropdownMenuItem>
								<TextCursorInput className="text-muted-foreground" />
								Rename
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Trash2 />
								Delete
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{playlist.image ? "Change" : "Upload"} image
						</DialogTitle>
						<DialogDescription>
							{playlist.image ? "Change the" : "Upload a"} cover image for your
							playlist.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={(event) => onSubmit(event)} className="space-y-4">
						<Input
							type="file"
							accept=".jpg,.avif"
							required
							onChange={(event) => {
								setImage(event.target.files?.[0]);
							}}
						/>
						<Button className="w-full" disabled={loading} type="submit">
							{loading && <LoaderCircle className="animate-spin" />}
							{playlist.image ? "Change" : "Upload"}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
