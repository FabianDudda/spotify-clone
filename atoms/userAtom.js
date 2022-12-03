import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const spotifyIdState = atom({
  key: "spotifyIdState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
