import { atom } from "nanostores";

export const $currentTrack = atom(0);
export const $playing = atom(false);
export const $playlist = atom<string[]>([]);
