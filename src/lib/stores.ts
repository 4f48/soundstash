import type { track } from "@/lib/schema";
import { atom } from "nanostores";

export const position = atom(0);
export const progress = atom(0);
export const seeking = atom(false);

export const loading = atom(false);
export const index = atom(0);
export const playing = atom(false);
export const playlist = atom<(typeof track.$inferSelect)[]>([]);
