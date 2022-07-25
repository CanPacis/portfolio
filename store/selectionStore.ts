import { atom } from "recoil";

export type Selection = string;

export const selectionStore = atom<Selection[]>({
  key: "selectionStore",
  default: [],
});
