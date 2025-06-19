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
import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
});

export default function Signup(): JSX.Element {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		authClient.signIn.email({
			email: values.email,
			password: values.password,
		});
	}
	return (
		<Card className="w-full max-w-sm self-center mx-auto">
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
					<form className="space-y-8">
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
										<a
											href="#"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</a>
									</div>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<Button
					type="submit"
					onClick={form.handleSubmit(onSubmit)}
					className="w-full"
				>
					Sign in
				</Button>
			</CardFooter>
		</Card>
	);
}
