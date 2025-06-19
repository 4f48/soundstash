import { auth } from "@/lib/auth/provider";
import * as authSchema from "@/lib/schema/auth.schema";
import type { APIRoute } from "astro";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const ALL: APIRoute = async (ctx) => {
	return auth.handler(ctx.request);
};
