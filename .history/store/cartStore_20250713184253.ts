import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  storage: string;
  quantity?: number;
};

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find((p) => p.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map((p) =>
              p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'mini-cart' }
  )
