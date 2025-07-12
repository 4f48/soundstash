import { auth } from "@/lib/auth/provider";
import { defineMiddleware } from "astro/middleware";

const PROTECTED_ROUTES = [
	"/account",
	"/api/cover",
	"/api/delete",
	"/api/delete",
	"/api/download",
	"/api/playlist/add",
	"/api/playlist/image",
	"/api/playlist/list",
	"/api/playlist/new",
	"/api/playlist/remove",
	"/api/playlist/track",
	"/api/playlist/tracks",
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
		if (
			!authenticated.user.emailVerified &&
			PROTECTED_ROUTES.includes(ctx.url.pathname)
		) {
			return ctx.redirect("/auth/verify");
		}
		/*
		if (
			authenticated.user.emailVerified &&
			ctx.url.pathname === "/auth/verify"
		) {
			return ctx.redirect("/account");
		}
		*/
		if (
			ctx.url.pathname.startsWith("/auth/") &&
			ctx.url.pathname !== "/auth/verify"
		)
			return ctx.redirect("/");
		if (ctx.url.pathname === "/") return ctx.rewrite("/home");
	} else {
		ctx.locals.user = null;
		ctx.locals.session = null;
		if (
			PROTECTED_ROUTES.includes(ctx.url.pathname) ||
			ctx.url.pathname.startsWith("/playlist/")
		)
			return ctx.redirect("/auth/signin", 303);
	}

	return next();
});
