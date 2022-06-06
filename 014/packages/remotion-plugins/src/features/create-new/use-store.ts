import create from "zustand";
import {devtools} from "zustand/middleware";
import {Schema} from "./types";

interface Store {
  data?: Schema;
  update: (data: Schema) => void;
  clear: () => void;
}

const useStore = create<Store>()(
  devtools((set) => ({
    update(data) {
      return set({data});
    },
    clear() {
      return set({}, true);
    },
  })),
);

export default useStore;
