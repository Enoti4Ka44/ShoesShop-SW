"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tighter mr-6"
        >
          <div>ShoesShop</div>
        </Link>
      </div>
    </header>
  );
}
