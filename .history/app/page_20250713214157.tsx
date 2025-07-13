"use client";

import { useProducts, Product } from "../hooks/useProducts";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DarkModeToggle from "../components/DarkModeToggle";

export default function HomePage() {
  const { data, isLoading, isError } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [storageFilter, setStorageFilter] = useState("");

  const filtered = data?.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchPrice =
      !priceFilter ||
      (priceFilter === "low" && product.price < 300000) ||
      (priceFilter === "mid" &&
        product.price >= 300000 &&
        product.price <= 800000) ||
      (priceFilter === "high" && product.price > 800000);
    const matchStorage = !storageFilter || product.storage === storageFilter;

    return matchSearch && matchPrice && matchStorage;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, id: Number(product.id) });
    toast.success(`${product.name} added to cart.`);
  };

  const handleBuyNow = (product: Product) => {
    addToCart({ ...product, id: Number(product.id) });
    router.push("/checkout");
  };

  if (isLoading)
    return <p className="text-center py-20">Loading products...</p>;
  if (isError)
    return (
      <p className=" bg text-center py-20 text-red-600">
        Failed to load products.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Hero Section */}
      <section
        className="text-center relative bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: "url('/images/iphone14bg.jpg')" }}
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-black dark:text-white mb-4">
            Discover Your Perfect Phone
          </h1>
          <p className="text-lg text-black dark:text-white max-w-xl mx-auto">
            Explore our curated selection of the latest smartphones tailored to
            your needs.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 dark:opacity-60"></div>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phones..."
          className="border border-gray-300  text-gray-500 px-4 py-3 rounded-lg shadow-sm w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <DarkModeToggle />

        <div className="flex gap-4 flex-wrap">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border text-gray-500 cursor-pointer border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Prices</option>
            <option value="low">Below ₦300k</option>
            <option value="mid">₦300k–₦800k</option>
            <option value="high">Above ₦800k</option>
          </select>

          <select
            value={storageFilter}
            onChange={(e) => setStorageFilter(e.target.value)}
            className="border text-gray-500 cursor-pointer border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Storage</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered?.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg shadow  transition-shadow duration-300ease-in-out p-4 flex flex-col transform hover:scale-110 hover:shadow-2xl"
            data-aos="fade-up"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain w-full h-64 mb-4"
            />
            <h2 className="font-semibold text-xl  dark:text-gray-500">
              {product.name}
            </h2>
            <p className="text-gray-900 dark:text-gray-300">
              {product.storage}
            </p>
            <p className="text-indigo-600 font-bold mt-auto dark:text-indigo-400">
              ₦{product.price.toLocaleString()}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-4xl font-bold text-center m-9 text-black dark:text-gray-400">
          Locate Our Store
        </h2>
        <div className="border rounded-lg overflow-hidden shadow-md w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4912.793310613608!2d3.3555577758715915!3d6.614356393379712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93b65ba86e15%3A0x3ae060fb3436c3ad!2sIkeja%20City%20Mall!5e1!3m2!1sen!2sng!4v1752430948068!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
