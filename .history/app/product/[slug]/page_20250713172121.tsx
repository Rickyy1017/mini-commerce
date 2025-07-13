'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '../../../store/cartStore';
import Image from 'next/image';
import toast from 'react-hot-toast';

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
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const raw = localStorage.getItem('products');
    if (!raw) return;

    const parsed: Product[] = JSON.parse(raw);
    const match = parsed.find((p) => p.slug === slug);

    setProduct(match || null);
    setLoading(false);
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20 text-red-600">Product not found.</p>;

  const handleAddToCart = () => {
    addToCart(product);
    toast((t) => (
      <div className="p-4">
        <p className="mb-2">{product.name} added to cart.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push('/checkout');
            }}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold cursor-pointer">{product.name}</h1>
