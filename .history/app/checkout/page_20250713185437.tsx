'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items ?? []);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum: number, item: any) => sum + item.price * (item.quantity ?? 1),
      0
    );
    setTotal(newTotal);
  }, [items]);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!');
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

          <div className="text-right text-xl font-bold mt-6">
            Total:{' '}
            <span className="text-indigo-600 dark:text-indigo-400">
              ₦{total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
