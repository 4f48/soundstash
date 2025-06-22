import { atom } from "nanostores";

export const $playing = atom("");
export const $playlist = atom<string[]>([""]);
