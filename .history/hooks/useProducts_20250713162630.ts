import { useQuery } from "@tanstack/react-query";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  storage: string;
  image: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/data/products.json");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | undefined> => {
  const res = await fetch("http://localhost:3000/data/products.json");
  if (!res.ok) throw new Error("Failed to fetch product");
  const products = (await res.json()) as Product[];
  return products.find((p) => p.slug === slug);
};
