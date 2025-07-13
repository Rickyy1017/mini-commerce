"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, addToCart, getTotal } = useCartStore();

  const increaseQty = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      addToCart({ ...item }); // just triggers increase if it already exists
    }
  };

  const decreaseQty = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      const updatedItems = items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
      useCartStore.setState({ items: updatedItems });
    } else {
      removeFromCart(id);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link href="/" className="text-indigo-600 mt-4 inline-block">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center border p-4 rounded shadow justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded w-24 h-24 object-contain"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500">Storage: {item.storage}</p>
                <p className="font-bold text-indigo-600">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 py-1 bg-red-200 text-red-600  rounded"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 py-1 bg-green-200 text-green-600 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-4 text-right">
        <h2 className="text-xl font-bold">
          Total: ₦{getTotal().toLocaleString()}
        </h2>
        <Link
          href="/checkout"
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/"
          className="inline-block mt-4 ml-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
