'use client';

import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  storage: string;
  image: string;
};

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/products.json');
  const data = await res.json();
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(data));
  }
  return data;
}

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: Infinity,
  });

  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <p className="text-center py-20">Loading products...</p>;
  if (isError || !data) return <p className="text-center py-20 text-red-600">Failed to load products.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-end mb-6">
        <Link href="/cart">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            View Cart
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Mini-Commerce</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
          >
            <Link href={/product/${product.slug}}>
              <div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-contain rounded"
                />
                <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-500">Storage: {product.storage}</p>
                <p className="text-indigo-600 font-bold text-xl">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            </Link>

            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  storage: product.storage,
                  image: product.image,
                });
                toast.success( ${product.name} added to cart);
              }}
              className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}