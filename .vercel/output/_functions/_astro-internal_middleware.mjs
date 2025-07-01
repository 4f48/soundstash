import { a as auth } from './chunks/provider_CRmnqdq3.mjs';
import { d as defineMiddleware, s as sequence } from './chunks/index_Cxeu10DD.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_sX4jaP5m.mjs';
import 'kleur/colors';
import './chunks/astro/server_BwXzANG0.mjs';
import 'clsx';
import 'cookie';

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
  "/library"
];
const onRequest$1 = defineMiddleware(async (ctx, next) => {
  const authenticated = await auth.api.getSession({
    headers: ctx.request.headers
  });
  if (authenticated) {
    ctx.locals.user = authenticated.user;
    ctx.locals.session = authenticated.session;
    if (ctx.url.pathname.startsWith("/auth/")) return ctx.redirect("/");
    if (ctx.url.pathname === "/") return ctx.rewrite("/home");
  } else {
    ctx.locals.user = null;
    ctx.locals.session = null;
    if (PROTECTED_ROUTES.includes(ctx.url.pathname) || ctx.url.pathname.startsWith("/playlist/"))
      return ctx.redirect("/auth/signin", 303);
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
