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
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
});

export default function Signup(): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		await authClient.signUp.email(
			{
				name: values.name,
				email: values.email,
				password: values.password,
			},
			{
				onResponse: () => setLoading(false),
				onSuccess: () => {
					toast.success("Successfully signed up.");
				},
				onError: ({ error }) => {
					toast.error(`Failed to sign up: ${error.message}`);
				},
			}
		);
	}
	return (
		<Card className="my-auto w-full max-w-sm self-center">
			<CardHeader>
				<CardTitle>Create your account</CardTitle>
				<CardDescription>
					Enter your email below to create an account.
				</CardDescription>
				<CardAction>
					<a href="/auth/signin">
						<Button variant="link">Sign in</Button>
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Your Beautiful Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={loading} className="w-full">
							{loading && <LoaderCircle className="animate-spin" />}
							Sign up
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
