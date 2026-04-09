"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 backdrop-blur shadow-sm">
      <div className="flex h-16 items-center gap-8 px-4 mx-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tighter mr-6"
        >
          <p className="font-extrabold text-2xl tracking-normal">ShoesShop</p>
        </Link>
        <nav className="w-full">
          <ul className="flex justify-center gap-4 font-semibold text-muted hover:text-black transition">
            <li className="font-semibold text-black/80 hover:text-black transition">
              <Link href="/">Главная</Link>
            </li>
            <li className="font-semibold text-black/80 hover:text-black transition">
              <Link href="/sales">Продажи</Link>
            </li>
            <li className="font-semibold text-black/80 hover:text-black transition">
              <Link href="/returns">Возвраты</Link>
            </li>
            <li className="font-semibold text-black/80 hover:text-black transition">
              <Link href="/clients">Клиенты</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
