"use client";

export default function Footer() {
  return (
    <footer className="py-4 mt-12 border-t text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Mini-Commerce. All rights reserved.
    </footer>
  );
}
