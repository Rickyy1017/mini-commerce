"use client";

import { useCartStore, CartItem } from "store/cartStore";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  const cart: CartItem[] = useCartStore((state) => state.items);
  const router = useRouter();

  const itemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  return (
    <div
      onClick={() => router.push("/cart")}
      className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition cursor-pointer"
    >
      <div className="relative">
        <FiShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
}
