import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
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
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
});

export default function Signup(): JSX.Element {
	const [loading, setLoading] = useState(false);
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
		authClient.signUp
			.email({
				name: values.name,
				email: values.email,
				password: values.password,
			})
			.then(({ error }) => {
				setLoading(false);
				error && console.error(error);
				!error && window.location.assign("/auth/signin");
			});
	}
	return (
		<Card className="w-full max-w-sm self-center my-auto">
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
						<Button type="submit" className="w-full">
							Sign up
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
