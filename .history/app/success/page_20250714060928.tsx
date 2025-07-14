"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="text-center py-20 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-2xl mb-2">Your order was placed successfully.</p>
      <p className="text-lg mb-2"></p>
      <p className="text-sm text-gray-500">
        Order ID:{" "}
        <span className="font-mono text-xl text-indigo-500">{orderId}</span>
      </p>
      <Link href="/" className="mt-6 inline-block text-indigo-600 underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <SuccessContent />
    </Suspense>
  );
}
