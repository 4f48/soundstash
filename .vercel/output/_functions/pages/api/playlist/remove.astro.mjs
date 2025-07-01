import { d as db, t as track, p as playlist, a as playlistToTrack } from '../../../chunks/database_Ch5beX0y.mjs';
import { and, eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const POST = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const request = await ctx.request.json();
  try {
    const isTrackOwned = await db.query.track.findFirst({
      where: and(eq(track.id, request.trackId), eq(track.owner, user.id))
    });
    const isPlaylistOwned = await db.query.playlist.findFirst({
      where: and(
        eq(playlist.id, request.playlistId),
        eq(playlist.owner, user.id)
      )
    });
    if (!isTrackOwned || !isPlaylistOwned)
      return new Response(null, { status: 403 });
    await db.delete(playlistToTrack).where(
      and(
        eq(playlistToTrack.playlistId, request.playlistId),
        eq(playlistToTrack.trackId, request.trackId)
      )
    );
  } catch (e) {
    if (e instanceof Error) console.error(e);
    return new Response("failed to add track to playlist", {
      status: 500
    });
  }
  return new Response(null);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
