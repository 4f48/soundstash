import { d as db } from './database_Ch5beX0y.mjs';
import { Resend } from 'resend';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const resend = new Resend("re_9qqNpW8U_9byNjcEPvSYHqqBGYukF43bg");

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: "SoundStash <noreply.soundstash@pirger.eu>",
        to: user.email,
        subject: "Password reset",
        text: `Dear ${user.name},
 We have received a request to reset your password for your account at SoundStash. Click the following link to change your password: ${url}.
If you did not request your password to be reset, ignore this email.

Best regards,
Oliver from SoundStash`
      });
      if (error) console.error(error);
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: "SoundStash <noreply.soundstash@pirger.eu>",
        to: user.email,
        subject: "Email verification",
        text: `Dear ${user.name},
Your email has been used to register a new account on SoundStash. Verify your email by clicking the following link: ${url}.
This link expires in 1 hour. If your verification link expired, you can request a new one in the account tab.
If you did not register the account, ignore this email.

Best regards,
Oliver from SoundStash`
      });
      if (error) console.error(error);
    }
  }
});

export { auth as a };
