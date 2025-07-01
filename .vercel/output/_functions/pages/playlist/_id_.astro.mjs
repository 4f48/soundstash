import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { A as AllTracks } from '../../chunks/all-tracks_CWZwu-3w.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { I as Input } from '../../chunks/input_T9MNZPkb.mjs';
import { B as Button, p as playPlaylist, a as playPlaylistShuffled } from '../../chunks/html_D7cA1FKc.mjs';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from '../../chunks/dialog_ByFnIg8s.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuGroup, e as DropdownMenuSub, f as DropdownMenuSubTrigger, g as DropdownMenuPortal, h as DropdownMenuSubContent, i as DropdownMenuItem } from '../../chunks/title_BXpxq37-.mjs';
import { d as db, p as playlist } from '../../chunks/database_Ch5beX0y.mjs';
import { n as navigate } from '../../chunks/router_vN4ZPF0m.mjs';
import { Play, Shuffle, MoreHorizontal, Image, Pencil, ImageMinus, ImagePlus, TextCursorInput, Trash2, LoaderCircle } from 'lucide-react';
import React__default from 'react';
import { $ as $$Player } from '../../chunks/player_Ce_Dw_eS.mjs';
import { and, eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

function PlaylistActions({
  playlist
}) {
  const [loading, setLoading] = React__default.useState(false);
  const [image, setImage] = React__default.useState(void 0);
  const [open, setOpen] = React__default.useState(false);
  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (!image) return;
    try {
      await fetch(`/api/playlist/image?id=${playlist.id}`, {
        body: new Blob([image]),
        headers: {
          "Content-Type": image.type,
          "Content-Length": image.size.toString()
        },
        method: playlist.image ? "PUT" : "POST"
      });
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) console.error(e.message);
      return 1;
    } finally {
      setLoading(false);
      setOpen(false);
      if (!playlist.image) navigate(`/playlist/${playlist.id}`);
    }
  }
  async function removeImage() {
    await fetch(`/api/playlist/image?id=${playlist.id}`, {
      method: "DELETE"
    });
    navigate(`/playlist/${playlist.id}`);
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 w-fit border rounded-md shadow-xs", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => playPlaylist(playlist),
        size: "icon",
        variant: "ghost",
        children: /* @__PURE__ */ jsx(Play, {})
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => playPlaylistShuffled(playlist),
        size: "icon",
        variant: "ghost",
        children: /* @__PURE__ */ jsx(Shuffle, {})
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx(MoreHorizontal, {}) }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Manage Playlist" }),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            playlist.image ? /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
              /* @__PURE__ */ jsxs(DropdownMenuSubTrigger, { className: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground gap-2", children: [
                /* @__PURE__ */ jsx(Image, {}),
                "Image"
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
                /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
                  /* @__PURE__ */ jsx(Pencil, {}),
                  "Change"
                ] }) }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => removeImage(), children: [
                  /* @__PURE__ */ jsx(ImageMinus, {}),
                  "Remove"
                ] })
              ] }) })
            ] }) : /* @__PURE__ */ jsx(DialogTrigger, { className: "w-full", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(ImagePlus, {}),
              "Add image"
            ] }) }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(TextCursorInput, { className: "text-muted-foreground" }),
              "Rename"
            ] }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(Trash2, {}),
              "Delete"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxs(DialogTitle, { children: [
            playlist.image ? "Change" : "Upload",
            " image"
          ] }),
          /* @__PURE__ */ jsxs(DialogDescription, { children: [
            playlist.image ? "Change the" : "Upload a",
            " cover image for your playlist."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: (event) => onSubmit(event), className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "file",
              accept: ".jpg,.avif",
              required: true,
              onChange: (event) => {
                setImage(event.target.files?.[0]);
              }
            }
          ),
          /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: loading, type: "submit", children: [
            loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
            playlist.image ? "Change" : "Upload"
          ] })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const user = Astro2.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const { id } = Astro2.params;
  if (!id) return new Response(null, { status: 400 });
  const playlist$1 = await db.query.playlist.findFirst({
    where: and(eq(playlist.id, id), eq(playlist.owner, user.id)),
    with: {
      playlistToTracks: {
        with: {
          track: true
        }
      }
    }
  });
  if (!playlist$1) return new Response(null, { status: 400 });
  const tracks = playlist$1.playlistToTracks.map(({ track }) => track);
  return renderTemplate`${renderComponent($$result, "Layout", $$Player, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-3 space-y-3"> <div class="flex items-center gap-3"> <h1 class="text-3xl font-bold">${playlist$1.name}</h1> ${renderComponent($$result2, "PlaylistActions", PlaylistActions, { "playlist": playlist$1, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/playlist-actions", "client:component-export": "default" })} </div> ${renderComponent($$result2, "AllTracks", AllTracks, { "tracks": tracks, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/all-tracks", "client:component-export": "default" })} </main> ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/playlist/[id].astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/playlist/[id].astro";
const $$url = "/playlist/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
