import create from "zustand";
import {devtools} from "zustand/middleware";
import IBirthdayCard from "~/types/birthday-card";

interface Store {
  data?: IBirthdayCard;
  update: (data: IBirthdayCard) => void;
  clear: () => void;
}

const useCreateCardStore = create<Store>()(
  devtools((set) => ({
    update(data) {
      return set({data});
    },
    clear() {
      return set({}, true);
    },
  })),
);

export default useCreateCardStore;
