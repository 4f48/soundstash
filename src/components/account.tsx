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
import { authClient } from "@/lib/auth/client";
import { LoaderCircle } from "lucide-react";
import { useState, type JSX } from "react";

export default function Account({
	user,
}: {
	user: App.Locals["user"];
}): JSX.Element {
	const [signoutLoading, setSignoutLoading] = useState(false);
	function signOut() {
		setSignoutLoading(true);
		authClient.signOut();
		setTimeout(() => window.location.assign("/"), 1000);
	}
	return (
		<Card className="mx-3">
			<CardHeader>
				<CardTitle className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance">
					Account Settings
				</CardTitle>
				<CardDescription>
					Manage your account, subscription, security and privacy.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<section>
					<h1 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
						Account Details
					</h1>
					<p>name: {user?.name}</p>
					<p>email: {user?.email}</p>
					{user?.emailVerified && <p>email verified: {user?.emailVerified}</p>}
				</section>
				<section className="flex flex-col items-start gap-2">
					<h1 className="scroll-m-20 border-b pb-2 w-full text-xl font-semibold tracking-tight first:mt-0">
						Account Actions
					</h1>
					<Button
						variant="destructive"
						disabled={signoutLoading}
						onClick={() => signOut()}
					>
						{signoutLoading && <LoaderCircle className="animate-spin" />}
						Sign out
					</Button>
				</section>
			</CardContent>
		</Card>
	);
}
