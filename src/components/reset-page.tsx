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
import { navigate } from "astro:transitions/client";
import { LoaderCircle } from "lucide-react";
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	password: z.string().nonempty(),
});

export default function ResetPage({ token }: { token: string }): JSX.Element {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		authClient.resetPassword(
			{
				newPassword: values.password,
				token,
			},
			{
				onSuccess: () => {
					(setLoading(false), setTimeout(() => navigate("/auth/signin"), 1000));
				},
				onError: ({ error }) => {
					console.error(error);
					setLoading(false);
				},
			}
		);
	}
	return (
		<Card className="w-full max-w-sm self-center my-auto">
			<CardHeader>
				<CardTitle>Forgot your password?</CardTitle>
				<CardDescription>
					Enter your email below to reset your password.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input
											placeholder="Something you'll remember"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={loading} className="w-full">
							{loading && <LoaderCircle className="animate-spin" />}
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
