"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "../../../store/cartStore";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  storage: string;
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const raw = localStorage.getItem("products");
    if (!raw) return;

    const parsed: Product[] = JSON.parse(raw);
    const match = parsed.find((p) => p.slug === slug);

    setProduct(match || null);
    setLoading(false);
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product)
    return <p className="text-center py-20 text-red-600">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">Storage: {product.storage}</p>
          <p className="text-indigo-600 text-2xl font-bold">
            ₦{product.price.toLocaleString()}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white px-6 py-3 rounded font-medium hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
