"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="text-center py-20 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg mb-2">Your order was placed successfully.</p>
      <p className="text-lg mb-2">I'll be grateful to get this .</p>
      <p className="text-sm text-gray-500">
        Order ID: <span className="font-mono text-indigo-500">{orderId}</span>
      </p>
      <Link href="/" className="mt-6 inline-block text-indigo-600 underline">
        Back to Home
      </Link>
    </div>
  );
}
