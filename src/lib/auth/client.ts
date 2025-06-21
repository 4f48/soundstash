import { bearer } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.PROD
		? import.meta.env.SITE
		: "http://localhost:4321",
});
