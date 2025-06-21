import { bearer } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.PROD
		? import.meta.env.SITE
		: "http://localhost:4321",
	fetchOptions: {
		onSuccess: (ctx) => {
			const authToken = ctx.response.headers.get("set-auth-token");
      console.debug(authToken);
			if (authToken) localStorage.setItem("bearer_token", authToken);
		},
		auth: {
		  type: "Bearer",
			token: () => localStorage.getItem("bearer_token") || ""
		}
	},
	plugins: [bearer()]
});
