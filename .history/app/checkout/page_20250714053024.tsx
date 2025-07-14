"use client";

import { useCartStore, CartItem } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items ?? []);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * (item.quantity ?? 1),
      0,
    );
    setTotal(newTotal);
  }, [items]);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderId = `ORD-${Math.floor(Math.random() * 1_000_000)}`;

    clearCart();
    toast.success(`Order placed! ID: ${orderId}`);
    router.push(`/success?order=${orderId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-center text-2xl text-red-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <p className="font-semibold text-lg dark:text-gray-500">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">{item.storage}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-700 dark:text-gray-500">
                  ₦{item.price.toLocaleString()} × {item.quantity ?? 1}
                </p>
              </div>
            </div>
          ))}

