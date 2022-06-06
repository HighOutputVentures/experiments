import create from "zustand";
import {devtools} from "zustand/middleware";

type Input = {
  celebrant: {
    name: string;
    image: File;
    dateOfBirth: Date;
  };
  messages: Array<{
    body: string;
    author: string;
    image?: File;
  }>;
};

interface Store {
  data?: Input;
  update: (data: Input) => void;
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
