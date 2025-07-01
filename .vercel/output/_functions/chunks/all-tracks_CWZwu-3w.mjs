import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as cn, B as Button, b as $playlist, d as $playing, e as $currentTrack, f as formatTime } from './html_D7cA1FKc.mjs';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MoreHorizontal, ListPlus, Plus, Play, Clock } from 'lucide-react';
import React__default, { useState } from 'react';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from './dialog_ByFnIg8s.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, i as DropdownMenuItem, T as Table, j as TableBody, k as TableRow, l as TableCell, m as TableHeader, n as TableHead, o as Title } from './title_BXpxq37-.mjs';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import './database_Ch5beX0y.mjs';
import { I as Input } from './input_T9MNZPkb.mjs';
import { useReactTable, getFilteredRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';

function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}

function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}

function Actions({
  track
}) {
  const [open, setOpen] = React__default.useState(false);
  const [playlists, setPlaylists] = React__default.useState();
  const [inPlaylists, setInPlaylists] = React__default.useState();
  async function fetchPlaylists() {
    const playlistsResult = await fetch("/api/playlist/list");
    const playlistsJson = await playlistsResult.json();
    const inPlaylistsResult = await fetch(`/api/playlist/track?id=${track.id}`);
    const inPlaylistsJson = await inPlaylistsResult.json();
    setPlaylists(playlistsJson);
    setInPlaylists(inPlaylistsJson.map(({ id }) => id));
  }
  React__default.useEffect(() => {
    if (!open) return;
    setPlaylists(void 0);
    (async () => await fetchPlaylists())();
  }, [open]);
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open actions menu" }),
        /* @__PURE__ */ jsx(MoreHorizontal, {})
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
        /* @__PURE__ */ jsxs(
          DropdownMenuItem,
          {
            onClick: () => {
              const current = $playlist.get();
              $playlist.set([...current, track]);
            },
            children: [
              /* @__PURE__ */ jsx(ListPlus, {}),
              "Add to queue"
            ]
          }
        ),
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
          /* @__PURE__ */ jsx(Plus, {}),
          "Add to playlist"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Add to playlist" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          'Add "',
          track.title,
          '" to a playlist for seamless listening sessions.'
        ] })
      ] }),
      /* @__PURE__ */ jsx(ScrollArea, { className: "h-[30vh]", children: /* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsx(TableBody, { children: playlists && inPlaylists ? playlists.map((playlist) => /* @__PURE__ */ jsxs(
        TableRow,
        {
          className: "flex items-center pr-2 gap-5",
          children: [
            /* @__PURE__ */ jsx(TableCell, { className: "flex-1", children: playlist.name }),
            /* @__PURE__ */ jsx("td", { className: "flex items-center", children: /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: inPlaylists.includes(playlist.id),
                onClick: async () => {
                  const request = {
                    playlistId: playlist.id,
                    trackId: track.id
                  };
                  await fetch(
                    inPlaylists.includes(playlist.id) ? "/api/playlist/remove" : "/api/playlist/add",
                    {
                      body: JSON.stringify(request),
                      headers: {
                        "Content-Type": "application/json"
                      },
                      method: "POST"
                    }
                  );
                  await fetchPlaylists();
                }
              }
            ) })
          ]
        },
        playlist.id
      )) : [...Array(3)].map((_, i) => /* @__PURE__ */ jsxs(TableRow, { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsx(TableCell, { className: "flex-1", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-3 rounded-full" }) }),
        /* @__PURE__ */ jsx("td", { className: "flex items-center", children: /* @__PURE__ */ jsx(Checkbox, { disabled: true }) })
      ] }, i)) }) }) })
    ] })
  ] });
}

function AllTracks({
  tracks
}) {
  const [columnFilters, setColumnFilters] = useState([]);
  const columns = [
    {
      id: "play",
      header: "#",
      size: 1,
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          Button,
          {
            size: "icon",
            variant: "ghost",
            onClick: async () => {
              $playing.set(false);
              $playlist.set(tracks);
              $currentTrack.set(row.index);
              $playing.set(true);
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "group-hover:hidden block", children: row.index + 1 }),
              /* @__PURE__ */ jsx(Play, { className: "group-hover:flex m-0 hidden" })
            ]
          }
        ) });
      }
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 400,
      cell: ({ row }) => {
        const track = row.original;
        return /* @__PURE__ */ jsx(Title, { artist: track.artist, id: track.id, title: track.title });
      }
    },
    {
      accessorKey: "album",
      header: "Album",
      cell: ({ row }) => {
        const track = row.original;
        return track.album ? track.album : "-";
      }
    },
    {
      accessorKey: "length",
      header: () => /* @__PURE__ */ jsx(Clock, { className: "size-4" }),
      cell: ({ row }) => {
        const track = row.original;
        return formatTime(track.length);
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const track = row.original;
        return /* @__PURE__ */ jsx(Actions, { track });
      }
    }
  ];
  const table = useReactTable({
    columns,
    data: tracks,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  });
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        className: "max-w-sm",
        onChange: (event) => table.getColumn("title")?.setFilterValue(event.target.value),
        placeholder: "Filter by title...",
        value: table.getColumn("title")?.getFilterValue() ?? ""
      }
    ),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(
          TableHead,
          {
            style: { width: header.column.columnDef.size },
            children: header.isPlaceholder ? null : flexRender(
              header.column.columnDef.header,
              header.getContext()
            )
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { width: cell.column.columnDef.size, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "You don't have any tracks yet." }) }) })
    ] })
  ] });
}

export { AllTracks as A };
