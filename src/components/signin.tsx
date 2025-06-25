import ResetDialog from "@/components/reset-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { navigate } from "astro:transitions/client";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
});

export default function Signup(): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onResponse: () => setLoading(false),
				onSuccess: () => navigate("/"),
				onError: ({ error }) => {
					toast.error(`Failed to sign in: ${error.message}`);
				},
			}
		);
	}
	return (
		<Card className="w-full max-w-sm self-center my-auto">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
				<CardAction>
					<a href="/auth/signup">
						<Button variant="link">Sign up</Button>
					</a>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-8"
						onSubmit={form.handleSubmit(onSubmit)}
					>
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel>Password</FormLabel>
										<span className="ml-auto inline-block">
											<ResetDialog />
										</span>
									</div>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={loading} className="w-full">
							{loading && <LoaderCircle className="animate-spin" />}
							Sign in
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
