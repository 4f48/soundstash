import { db } from "@/lib/database";
import { playlist } from "@/lib/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	try {
		const name = ctx.url.searchParams.get("name");
		if (!name)
			return new Response("no name search param provided", { status: 400 });
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const id = crypto.randomUUID();
		await db.insert(playlist).values({
			id,
			name,
			owner: user.id,
		});

		return new Response(id);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};
