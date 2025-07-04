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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email().nonempty(),
});

export default function ResetDialog(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		authClient.requestPasswordReset(
			{
				email: values.email,
				redirectTo: "/auth/reset",
			},
			{
				onSuccess: () => setLoading(false),
				onError: ({ error }) => {
					console.error(error);
					setLoading(false);
				},
			}
		);
	}
	return (
		<Dialog>
			<DialogTrigger className="text-sm underline-offset-4 hover:underline">
				Forgot your password?
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Forgot your password?</DialogTitle>
					<DialogDescription>
						Enter your email below to reset your password.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="you@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={loading} className="w-full">
							{loading && <LoaderCircle className="animate-spin" />}
							Send
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
