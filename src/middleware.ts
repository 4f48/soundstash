import { auth } from "@/lib/auth/provider";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (ctx, next) => {
	const authenticated = await auth.api.getSession({
		headers: ctx.request.headers,
	});
	if (authenticated) {
		ctx.locals.user = authenticated.user;
		ctx.locals.session = authenticated.session;
	} else {
		ctx.locals.user = null;
		ctx.locals.session = null;
	}

	return next();
});
