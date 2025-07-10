import type { track } from "@/lib/schema";
import { atom } from "nanostores";

export const loading = atom(false);
export const index = atom(0);
export const playing = atom(false);
export const playlist = atom<(typeof track.$inferSelect)[]>([]);
