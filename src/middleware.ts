import { auth } from "@/lib/auth/provider";
import { defineMiddleware } from "astro/middleware";

const PROTECTED_PAGES = [
	"/home",
	"/playlists",
	"/settings",
	"/storage",
	"/upload",
];

export const onRequest = defineMiddleware(async (ctx, next) => {
	const authenticated = await auth.api.getSession({
		headers: ctx.request.headers,
	});

	const pathname = ctx.url.pathname;

	if (authenticated) {
		ctx.locals.user = authenticated.user;
		ctx.locals.session = authenticated.session;

		switch (true) {
			case !authenticated.user.emailVerified &&
				pathname !== "/auth/verify" &&
				!pathname.startsWith("/api/auth/") &&
				!pathname.startsWith("/api/proxy/"):
				if (pathname.startsWith("/api/")) {
					return new Response("verify account email before accessing api", {
						status: 401,
					});
				} else {
					return ctx.redirect("/auth/verify");
				}
			case pathname.startsWith("/auth/"):
				return ctx.redirect("/", 303);
			case ctx.url.pathname === "/":
				return ctx.rewrite("/home");
		}

		return next();
	}
	ctx.locals.user = null;
	ctx.locals.session = null;

	switch (true) {
		case pathname.startsWith("/api/") &&
			!pathname.startsWith("/api/auth/") &&
			!pathname.startsWith("/api/proxy/"):
			return new Response("authenticate before accessing this route", {
				status: 401,
			});
		case pathname.startsWith("/playlist/"):
			return ctx.redirect("/auth/signin", 303);
		case PROTECTED_PAGES.includes(pathname):
			return ctx.redirect("/auth/signin", 303);
	}

	return next();
});
