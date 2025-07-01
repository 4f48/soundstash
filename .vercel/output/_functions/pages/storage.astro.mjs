import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { T as Table, m as TableHeader, k as TableRow, n as TableHead, j as TableBody, l as TableCell, o as Title, D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, i as DropdownMenuItem } from '../chunks/title_BXpxq37-.mjs';
import { c as cn, B as Button } from '../chunks/html_D7cA1FKc.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, e as CardAction, d as CardContent } from '../chunks/card_CEc-XKQm.mjs';
import { I as Input } from '../chunks/input_T9MNZPkb.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React__default, { useState } from 'react';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from '../chunks/dialog_ByFnIg8s.mjs';
import { a as authClient } from '../chunks/client_C1b0uAZ7.mjs';
import { UploadIcon, LoaderCircle, HardDrive, MoreHorizontal, Trash2, ArrowUpDown } from 'lucide-react';
import { parseBlob } from 'music-metadata';
import { useReactTable, getSortedRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import byteSize from 'byte-size';
import { $ as $$Player } from '../chunks/player_Ce_Dw_eS.mjs';
import { d as db, t as track } from '../chunks/database_Ch5beX0y.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}

function Upload({
  onUploadSuccess
}) {
  const [loading, setLoading] = React__default.useState(false);
  const [tracks, setTracks] = React__default.useState(void 0);
  const [open, setOpen] = React__default.useState(false);
  const { data: session } = authClient.useSession();
  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (!tracks || !session?.user?.id) return;
    try {
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const { common, format } = await parseBlob(track);
        const cover = common.picture;
        const urlRequest = {
          coverLength: cover ? cover[0].data.length : void 0,
          coverType: cover ? cover[0].format : void 0,
          trackLength: track.size,
          trackType: track.type
        };
        const urlResult = await fetch("/api/upload/authorize", {
          body: JSON.stringify(urlRequest),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        });
        const urlResponse = await urlResult.json();
        const uploadTrackResponse = await fetch(urlResponse.trackUrl, {
          body: track,
          headers: {
            "Content-Length": urlRequest.trackLength.toString(),
            "Content-Type": urlRequest.trackType
          },
          method: "PUT"
        });
        if (cover && urlResponse.coverUrl && urlRequest.coverLength && urlRequest.coverType)
          await fetch(urlResponse.coverUrl, {
            body: cover[0].data,
            headers: {
              "Content-Length": urlRequest.coverLength.toString(),
              "Content-Type": urlRequest.coverType
            },
            method: "PUT"
          });
        const finalizeRequest = {
          album: common.album,
          artist: common.artist,
          id: urlResponse.uuid,
          length: format.duration,
          size: track.size,
          title: common.title
        };
        if (uploadTrackResponse.ok)
          await fetch("/api/upload/finalize", {
            body: JSON.stringify(finalizeRequest),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          });
      }
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) console.error(e.message);
      return 1;
    } finally {
      onUploadSuccess?.();
      setLoading(false);
      setOpen(false);
    }
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
      /* @__PURE__ */ jsx(UploadIcon, {}),
      "Upload"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Upload tracks" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Upload your MP3, FLAC, and Opus files to SoundStash's cloud storage for online playback." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (event) => onSubmit(event), className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "file",
            multiple: true,
            accept: ".mp3,.flac,.opus",
            required: true,
            onChange: (event) => {
              setTracks(event.target.files);
            }
          }
        ),
        /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: loading, type: "submit", children: [
          loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
          "Upload"
        ] })
      ] })
    ] })
  ] });
}

function Account({
  initialTracks
}) {
  const [tracks, setTracks] = useState(initialTracks);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const fetchTracks = async () => {
    try {
      const response = await fetch("/api/tracks");
      if (response.ok) {
        const updatedTracks = await response.json();
        setTracks(updatedTracks);
      }
    } catch (error) {
      console.error("Failed to fetch tracks:", error);
    }
  };
  const usedBytes = tracks.reduce((total, track) => total + track.size, 0);
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => /* @__PURE__ */ jsx(Header, { column, title: "Title" }),
      cell: ({ row }) => {
        const track = row.original;
        return /* @__PURE__ */ jsx(Title, { artist: track.artist, id: track.id, title: track.title });
      }
    },
    {
      accessorKey: "album",
      header: ({ column }) => /* @__PURE__ */ jsx(Header, { column, title: "Album" })
    },
    {
      accessorKey: "size",
      header: ({ column }) => /* @__PURE__ */ jsx(Header, { column, title: "Size" }),
      cell: ({ row }) => byteSize(row.getValue("size"), {
        precision: 2
      }).toString()
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const track = row.original;
        return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open actions menu" }),
            /* @__PURE__ */ jsx(MoreHorizontal, {})
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuContent, { children: /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: () => {
                fetch(`/api/delete?id=${track.id}`, {
                  method: "DELETE"
                }).then(() => fetchTracks());
              },
              children: [
                /* @__PURE__ */ jsx(Trash2, {}),
                "Delete"
              ]
            }
          ) })
        ] });
      }
    }
  ];
  const table = useReactTable({
    columns,
    data: tracks,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting
    }
  });
  return /* @__PURE__ */ jsxs(Card, { className: "mx-3", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "scroll-m-20 text-3xl font-extrabold tracking-tight text-balance", children: "Manage storage" }),
      /* @__PURE__ */ jsxs(CardDescription, { children: [
        "Add or remove songs from your library and manage storage. Go to",
        " ",
        /* @__PURE__ */ jsx("a", { className: "underline", href: "/", children: "player" }),
        " ",
        "to listen to your songs."
      ] }),
      /* @__PURE__ */ jsxs(CardAction, { className: "space-x-2", children: [
        /* @__PURE__ */ jsx(Upload, { onUploadSuccess: fetchTracks }),
        /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, className: "disabled:pointer-events-auto", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: true, children: [
            /* @__PURE__ */ jsx(HardDrive, {}),
            "Get storage"
          ] }) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: "You'll be able to get more storage in the future." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            className: "max-w-sm",
            onChange: (event) => table.getColumn("title")?.setFilterValue(event.target.value),
            placeholder: "Filter by title...",
            value: table.getColumn("title")?.getFilterValue() ?? ""
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "flex flex-1 text-sm text-muted-foreground justify-end items-center", children: [
          byteSize(usedBytes, {
            precision: 2
          }).toString(),
          " ",
          "of 100 MB used"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
          return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
            header.column.columnDef.header,
            header.getContext()
          ) }, header.id);
        }) }, headerGroup.id)) }),
        /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
          TableRow,
          {
            "data-state": row.getIsSelected() && "selected",
            children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            ) }, cell.id))
          },
          row.id
        )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: columns.length,
            className: "h-24 text-center",
            children: "You don't have any tracks yet."
          }
        ) }) })
      ] })
    ] })
  ] });
}
function Header({
  column,
  title
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    title,
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-end", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        children: /* @__PURE__ */ jsx(ArrowUpDown, { className: "size-4 flex-1" })
      }
    ) })
  ] });
}

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Storage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Storage;
  const user = Astro2.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const tracks = await db.query.track.findMany({
    where: eq(track.owner, user.id)
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Player, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LibraryComponent", Account, { "initialTracks": tracks, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/library", "client:component-export": "default" })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/storage.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/storage.astro";
const $$url = "/storage";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Storage,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
