import { d as db, t as track } from '../../../chunks/database_Ch5beX0y.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const GET = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const id = ctx.url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });
  const playlist = await db.query.track.findFirst({
    columns: {
      id: true
    },
    where: eq(track.id, id),
    with: {
      playlistToTracks: {
        with: {
          playlist: true
        }
      }
    }
  });
  if (!playlist) return new Response(null, { status: 400 });
  const tracks = playlist.playlistToTracks.map(({ playlist: playlist2 }) => playlist2);
  return new Response(JSON.stringify(tracks), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
