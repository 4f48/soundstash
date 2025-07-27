import { db } from "@/lib/database";
import {
	getPlaylistWithTracks,
	addToPlaylist,
	removeFromPlaylist,
} from "@/lib/playlist";
import { playlist, track as trackTable } from "@/lib/schema";
import { client } from "@/lib/storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async (ctx) => {
	try {
		const id = ctx.url.searchParams.get("id");
		if (!id) return new Response("no id provided", { status: 400 });
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const result = await getPlaylistWithTracks(id);

		if (!result) return new Response("playlist not found", { status: 404 });
		if (result.owner !== user.id)
			return new Response("you do not have access to this playlist", {
				status: 403,
			});

		return new Response(JSON.stringify(result), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};

export const POST: APIRoute = async (ctx) => {
	try {
		const name = ctx.url.searchParams.get("name");
		if (!name) return new Response("no name provided", { status: 400 });
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

export const PUT: APIRoute = async (ctx) => {
	try {
		const id = ctx.url.searchParams.get("id");
		const action = ctx.url.searchParams.get("action") as "add" | "remove";
		const track = ctx.url.searchParams.get("track");
		if (!id || !action || !track)
			return new Response("no id, action or track provided", { status: 400 });
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const checkPlaylist = await db.query.playlist.findFirst({
			where: eq(playlist.id, id),
		});
		if (!checkPlaylist)
			return new Response("playlist not found", { status: 404 });
		if (checkPlaylist.owner !== user.id)
			return new Response("you do not have access to this playlist", {
				status: 403,
			});

		const checkTrack = await db.query.track.findFirst({
			where: eq(trackTable.id, track),
		});
		if (!checkTrack) return new Response("track not found", { status: 404 });
		if (checkTrack.owner !== user.id)
			return new Response("you do not have access to this track", {
				status: 403,
			});

		switch (action) {
			case "add":
				await addToPlaylist(id, track);
				break;
			case "remove":
				await removeFromPlaylist(id, track);
				break;
		}

		return new Response(null);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};

export const DELETE: APIRoute = async (ctx) => {
	try {
		const id = ctx.url.searchParams.get("id");
		if (!id) return new Response("no id provided", { status: 400 });

		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const result = await db
			.delete(playlist)
			.where(and(eq(playlist.id, id), eq(playlist.owner, user.id)))
			.returning({ image: playlist.image });
		if (result.length === 0)
			return new Response("playlist does not exist", { status: 404 });

		if (result[0].image) {
			const command = new DeleteObjectCommand({
				Bucket: CLOUDFLARE_R2_BUCKET,
				Key: `playlists/${id}`,
			});
			client.send(command);
		}

		return new Response(null);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};
