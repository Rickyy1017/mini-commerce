// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  price: number;
  storage: string;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const items = get().items;
        const exists = items.find((i) => i.id === item.id);
        if (exists) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
