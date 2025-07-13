import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  image: string;
  storage: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  // ... other actions
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: (i.quantity ?? 1) + 1 } : i,
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] });
        }
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
