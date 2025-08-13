import { db } from "@/lib/database";
import { resend } from "@/lib/email";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "astro:env/server";
import {
	BETTER_AUTH_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
} from "astro:env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

function toHex(u8: Uint8Array): string {
	return Array.from(u8)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

function fromHex(hex: string): Uint8Array {
	if (!/^[0-9a-fA-F]*$/.test(hex) || hex.length % 2 !== 0) {
		throw new Error("Invalid hex");
	}
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
	}
	return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.length !== b.length) return false;
	let out = 0;
	for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
	return out === 0;
}

async function importPasswordKey(password: string) {
	const enc = new TextEncoder();
	return crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveBits", "deriveKey"]
	);
}

async function derivePbkdf2Bits(
	keyMaterial: CryptoKey,
	salt: Uint8Array,
	iterations: number
) {
	return crypto.subtle.deriveBits(
		{
			name: "PBKDF2",
			hash: "SHA-256",
			salt: salt as BufferSource,
			iterations,
		},
		keyMaterial,
		256
	);
}

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		password: {
			hash: async (password) => {
				const salt = crypto.getRandomValues(new Uint8Array(16));
				const keyMaterial = await importPasswordKey(password);
				const bits = await derivePbkdf2Bits(keyMaterial, salt, 100_000);
				const hash = new Uint8Array(bits);
				return `pbkdf2_sha256$${100_000}$${toHex(salt)}$${toHex(hash)}`;
			},
			verify: async ({ hash, password }) => {
				const parts = hash.split("$");
				if (parts.length !== 4 || parts[0] !== "pbkdf2_sha256") {
					return false;
				}
				const iterations = parseInt(parts[1], 10);
				if (!Number.isFinite(iterations) || iterations <= 0)
					throw new Error("Invalid iterations");
				const salt = fromHex(parts[2]);
				const expected = fromHex(parts[3]);

				const keyMaterial = await importPasswordKey(password);
				const bits = await derivePbkdf2Bits(keyMaterial, salt, iterations);
				const actual = new Uint8Array(bits);

				return timingSafeEqual(actual, expected);
			},
		},
		sendResetPassword: async ({ user, url }) => {
			const { error } = await resend.emails.send({
				from: "SoundStash <noreply.soundstash@pirger.eu>",
				to: user.email,
				subject: "Password reset",
				text: `Dear ${user.name},\n We have received a request to reset your password for your account at SoundStash. Click the following link to change your password: ${url}.\nIf you did not request your password to be reset, ignore this email.\n\nBest regards,\nOliver from SoundStash`,
			});
			if (error) console.error(error);
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const { error } = await resend.emails.send({
				from: "SoundStash <noreply.soundstash@pirger.eu>",
				to: user.email,
				subject: "Email verification",
				text: `Dear ${user.name},\nYour email has been used to register a new account on SoundStash. Verify your email by clicking the following link: ${url}.\nThis link expires in 1 hour. If your verification link expired, you can request a new one in the account tab.\nIf you did not register the account, ignore this email.\n\nBest regards,\nOliver from SoundStash`,
			});
			if (error) console.error(error);
		},
	},
	rateLimit: {
		enabled: false,
	},
	secret: BETTER_AUTH_SECRET,
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 300,
		},
	},
	socialProviders:
		GITHUB_CLIENT_ID &&
		GITHUB_CLIENT_SECRET &&
		GOOGLE_CLIENT_ID &&
		GOOGLE_CLIENT_SECRET
			? {
					...(GITHUB_CLIENT_ID &&
						GITHUB_CLIENT_SECRET && {
							github: {
								clientId: GITHUB_CLIENT_ID,
								clientSecret: GITHUB_CLIENT_SECRET,
							},
						}),
					...(GOOGLE_CLIENT_ID &&
						GOOGLE_CLIENT_SECRET && {
							google: {
								clientId: GOOGLE_CLIENT_ID,
								clientSecret: GOOGLE_CLIENT_SECRET,
								prompt: "select_account",
							},
						}),
				}
			: undefined,
});
