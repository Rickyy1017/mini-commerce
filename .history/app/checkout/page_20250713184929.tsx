'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  storage: string;
};

export default function CheckoutPage() {
  const cart: CartItem[] = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity ?? 1),
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    const orderId = ORD-${Math.floor(Math.random() * 1_000_000)};

    clearCart();
    toast.success(Order placed! ID: ${orderId});
    router.push(/success?order=${orderId});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-semibold text-lg dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-500">{item.storage}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  ₦{item.price.toLocaleString()} × {item.quantity ?? 1}
                </p>
              </div>
            </div>
          ))}

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