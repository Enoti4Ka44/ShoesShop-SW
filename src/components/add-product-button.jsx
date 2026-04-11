"use client";

import { useState } from "react";
import ProductModal from "./product-modal";

export default function AddProductButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
      >
        + Добавить товар
      </button>

      <ProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
