import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.PROD
		? import.meta.env.SITE
		: "http://localhost:4321",
	fetchOptions: {
		onSuccess: (ctx) => {
			const authToken = ctx.response.headers.get("set-auth-token");
			if (authToken) localStorage.setItem("bearer_token", authToken);
		},
	},
});
