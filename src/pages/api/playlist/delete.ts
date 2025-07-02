import { db } from "@/lib/database";
import { playlist } from "@/lib/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const DELETE: APIRoute = async (ctx) => {
	try {
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const id = ctx.url.searchParams.get("id");
		if (!id) return new Response(null, { status: 400 });
		const checkResult = await db.query.playlist.findFirst({
			where: and(eq(playlist.id, id), eq(playlist.owner, user.id)),
		});
		if (!checkResult) return new Response(null, { status: 403 });

		await db.delete(playlist).where(eq(playlist.id, id));
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return new Response(null, { status: 500 });
	}
	return new Response(null);
};
