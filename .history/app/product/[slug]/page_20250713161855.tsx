"use client";

import { useProducts } from "";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const { data, isLoading, isError } = useProducts();

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

  if (isLoading)
    return <p className="text-center py-20">Loading products...</p>;
  if (isError)
    return (
      <p className=" bg- text-center py-20 text-red-600">
        Failed to load products.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Discover Your Perfect Phone
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Explore our curated selection of the latest smartphones tailored to
          your needs.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phones..."
          className="border border-gray-300 px-4 py-3 rounded-lg shadow-sm w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-4 flex-wrap">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Prices</option>
            <option value="low">Below ₦300k</option>
            <option value="mid">₦300k–₦800k</option>
            <option value="high">Above ₦800k</option>
          </select>

          <select
            value={storageFilter}
            onChange={(e) => setStorageFilter(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain w-full h-64 mb-4"
            />
            <h2 className="font-semibold text-xl text-gray-900">
              {product.name}
            </h2>
            <p className="text-gray-600">{product.storage}</p>
            <p className="text-indigo-600 font-bold mt-auto">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center mt-12">
        <p className="text-lg text-gray-700 mb-4">
          Ready to find your perfect phone? Start exploring now!
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300">
          Shop Now
        </button>
      </section>
    </div>
  );
}
