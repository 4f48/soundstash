import { auth } from "@/lib/auth/provider";
import { defineMiddleware } from "astro/middleware";

const PROTECTED_ROUTES = [
	"/account",
	"/api/cover",
	"/api/delete",
	"/api/delete",
	"/api/download",
	"/api/tracks",
	"/api/upload/authorize",
	"/api/upload/finalize",
	"/home",
	"/library",
];

export const onRequest = defineMiddleware(async (ctx, next) => {
	const authenticated = await auth.api.getSession({
		headers: ctx.request.headers,
	});
	if (authenticated) {
		ctx.locals.user = authenticated.user;
		ctx.locals.session = authenticated.session;
		if (ctx.url.pathname.startsWith("/auth/")) return ctx.redirect("/");
		if (ctx.url.pathname === "/") return ctx.rewrite("/home");
	} else {
		ctx.locals.user = null;
		ctx.locals.session = null;
		if (PROTECTED_ROUTES.includes(ctx.url.pathname))
			return ctx.redirect("/auth/signin", 303);
	}

	return next();
});
