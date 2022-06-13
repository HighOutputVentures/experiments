import create from "zustand";
import {devtools} from "zustand/middleware";
import {Schema} from "../features/create-new/types";

export interface Store {
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
      return set({
        data: undefined,
      });
    },
  })),
);

export default useStore;
