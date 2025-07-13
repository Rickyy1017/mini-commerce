"use client";

import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Mini-Commerce</h1>
      <DarkModeToggle />
    </header>
  );
}
