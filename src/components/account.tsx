import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/client";
import { navigate } from "astro:transitions/client";
import { Check, LoaderCircle, Mail } from "lucide-react";
import { useState, type JSX } from "react";

export default function Account({
	user,
}: {
	user: App.Locals["user"];
}): JSX.Element {
	if (!user) throw new Error("user is not defined");

	const [changePasswordLoading, setChangePasswordLoading] = useState(false);
	const [signoutLoading, setSignoutLoading] = useState(false);
	const [verifyButton, setVerifyButton] = useState<JSX.Element>(
		<>
			<Mail /> Verify email
		</>
	);
	const [verifyLoading, setVerifyLoading] = useState(false);
	function requestChange() {
		if (!user) throw new Error("user is not defined");
		setChangePasswordLoading(true);
		authClient.requestPasswordReset(
			{
				email: user.email,
				redirectTo: "/auth/reset",
			},
			{
				onSuccess: () => setChangePasswordLoading(false),
				onError: ({ error }) => {
					console.error(error);
					setChangePasswordLoading(false);
				},
			}
		);
	}
	function signOut() {
		setSignoutLoading(true);
		authClient.signOut();
		setTimeout(() => navigate("/"), 1000);
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
					<p>email verified: {user?.emailVerified ? "Yes" : "No"}</p>
				</section>
				<section className="flex flex-col items-start gap-2">
					<h1 className="scroll-m-20 border-b pb-2 w-full text-xl font-semibold tracking-tight first:mt-0">
						Account Actions
					</h1>
					<div className="flex gap-2">
						{!user?.emailVerified && (
							<Button
								disabled={verifyLoading}
								onClick={() => {
									setVerifyLoading(true);
									setVerifyButton(
										<>
											<LoaderCircle className="animate-spin" /> Verify email
										</>
									);
									authClient.sendVerificationEmail(
										{
											email: user.email,
											callbackURL: "/account",
										},
										{
											onSuccess: () => {
												setVerifyLoading(false);
												setVerifyButton(
													<>
														<Check />
														Sent email
													</>
												);
												setTimeout(
													() =>
														setVerifyButton(
															<>
																<Mail /> Verify email
															</>
														),
													5000
												);
											},
										}
									);
								}}
							>
								{verifyButton}
							</Button>
						)}
						<Button
							variant="outline"
							disabled={changePasswordLoading}
							onClick={() => requestChange()}
						>
							{changePasswordLoading && (
								<LoaderCircle className="animate-spin" />
							)}
							Change password
						</Button>
						<Button
							variant="destructive"
							disabled={signoutLoading}
							onClick={() => signOut()}
						>
							{signoutLoading && <LoaderCircle className="animate-spin" />}
							Sign out
						</Button>
					</div>
				</section>
			</CardContent>
		</Card>
	);
}
