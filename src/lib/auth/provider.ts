import { db } from "@/lib/database";
import { resend } from "@/lib/email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			const { error } = await resend.emails.send({
				from: "SoundStash <noreply.soundstash@pirger.eu>",
				to: user.email,
				subject: "Email verification",
				text: `Greetings, ${user.name}!\nYour email has been used to register a new account on SoundStash. Verify your email by clicking the following link: ${url}.\nIf you did not register the account, ignore this email.\n\nBest regards,\nOliver from SoundStash`,
			});
		},
	},
});
