import { atom } from "recoil";

export const isVisibleState = atom({
  key: "isVisibleState",
  default: false,
});

export const formIdState = atom({
  key: "formIdState",
  default: undefined,
});

export const deleteIdState = atom({
  key: "deleteIdState",
  default: null,
});
