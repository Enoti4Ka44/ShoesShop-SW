"use client";

import { useState } from "react";
import ProductModal from "./product-modal";
import { deleteProduct } from "@/actions/products";

const ProductCardFunc = ({ product }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Вы уверены, что хотите удалить "${product.name}"?`)) {
      setIsDeleting(true);
      const result = await deleteProduct(product.product_id);
      if (!result.success) {
        alert(`Ошибка удаления: ${result.error}`);
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
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
              className={`text-xs font-medium ${product.stock_quantity === 0 ? "text-red-500" : "text-green-600"}`}
            >
              {product.stock_quantity === 0
                ? "Нет в наличии"
                : `Осталось: ${product.stock_quantity}`}
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="cursor-pointer w-full py-2 px-4 rounded-md font-medium transition-colors bg-black text-white hover:bg-gray-800 text-sm"
            >
              Изменить
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="cursor-pointer w-full py-2 px-4 rounded-md font-medium transition-colors bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 text-sm"
            >
              {isDeleting ? "..." : "Удалить"}
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCardFunc;
