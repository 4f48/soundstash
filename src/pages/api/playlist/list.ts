import { db } from "@/lib/database";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { playlist } from "drizzle/schema";

export const GET: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });

	const result = await db.query.playlist.findMany({
		columns: {
			owner: false,
		},
		where: eq(playlist.owner, user.id),
	});
	if (!result) return new Response(null, { status: 500 });

	return new Response(JSON.stringify(result), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
