"use client";

import { useCart } from "./cart-provider";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <div className="border border-black/10 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.brand}
          </span>
          <span className="text-xs text-gray-400">
            Арт: {product.item_number}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {product.category} • {product.color} • Размер: {product.shoe_size}
        </p>
      </div>

      <div className="border-t pt-4 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-black">
            {Number(product.price).toLocaleString("ru-RU")} ₽
          </span>
          <span
            className={`text-xs font-bold font-medium ${isOutOfStock ? "text-red-500" : "text-green-600"}`}
          >
            {isOutOfStock
              ? "Нет в наличии"
              : `Осталось: ${product.stock_quantity}`}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={isOutOfStock}
          className={`cursor-pointer w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isOutOfStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isOutOfStock ? "Распродано" : "В корзину"}
        </button>
      </div>
    </div>
  );
}
