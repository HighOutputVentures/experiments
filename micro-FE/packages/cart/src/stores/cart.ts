import { constants, IProduct } from "common";
import { writable } from "svelte/store";

type Item = {
  product: IProduct;
  quantity: number;
};

export default function cartStore() {
  const init = localStorage.getItem(constants.LOCALSTORAGE_CART_ID);
  const items = writable<Item[]>(init ? JSON.parse(init) : []);

  const subscribe = (callback?: (newValue: Item[]) => void) => {
    return items.subscribe((value) => {
      localStorage.setItem(constants.LOCALSTORAGE_CART_ID, JSON.stringify(value));
      callback?.(value);
    });
  };

  const add = (product: IProduct, quantity: number) => {
    items.update((oldItems) => {
      const index = oldItems.findIndex((o) => o.product.id === product.id);

      // item does not exist on the cart yet
      if (index < 0) {
        const newItem = { product, quantity };
        items.set([newItem, ...oldItems]);
      }

      // existing item
      // increment quantity
      const newItem = {
        product,
        quantity: quantity + items[index].quantity,
      };

      return [newItem, ...[...oldItems].filter((...args) => args[1] !== index)];
    });
  };

  const remove = (product: IProduct) => {
    items.update((oldItems) => {
      return [...oldItems].filter((o) => o.product.id !== product.id);
    });
  };

  const clear = () => {
    items.set([]);
  };

  return {
    items,
    add,
    remove,
    clear,
    subscribe,
  };
}
