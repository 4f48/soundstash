import type { track } from "drizzle/schema";
import { atom } from "nanostores";

export const $currentTrack = atom(0);
export const $playing = atom(false);
export const $playlist = atom<(typeof track.$inferSelect)[]>([]);
