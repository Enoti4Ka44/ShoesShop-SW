"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export default function Header() {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 backdrop-blur shadow-sm bg-white/80">
      <div className="flex justify-between h-16 items-center justify-between px-4 mx-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tighter"
        >
          <p className="font-extrabold text-2xl tracking-normal">ShoesShop</p>
        </Link>
        <nav>
          <ul className="flex gap-6 font-semibold text-black/60">
            <li className="hover:text-black transition">
              <Link href="/">Главная</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/sales">Продажи</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/returns">Возвраты</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/clients">Клиенты</Link>
            </li>
            <li className="hover:text-black transition">
              <Link href="/products">Товары</Link>
            </li>
          </ul>
        </nav>

        <Link
          href="/cart"
          className="flex gap-2 items-center relative font-semibold text-black/60 hover:text-black transition transition"
        >
          {cartItemsCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartItemsCount}
            </span>
          )}
          Корзина
        </Link>
      </div>
    </header>
  );
}
