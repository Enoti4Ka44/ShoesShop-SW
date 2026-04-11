"use client";

import { useState } from "react";
import { addProduct, updateProduct } from "@/actions/products";

export default function ProductModal({ isOpen, onClose, product = null }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isEdit = !!product;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      item_number: formData.get("item_number"),
      name: formData.get("name"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      shoe_size: Number(formData.get("shoe_size")),
      color: formData.get("color"),
      price: Number(formData.get("price")),
      stock_quantity: Number(formData.get("stock_quantity")),
    };

    let result;
    if (isEdit) {
      result = await updateProduct(product.product_id, data);
    } else {
      result = await addProduct(data);
    }

    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      alert(`Ошибка: ${result.error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Редактировать товар" : "Добавить новый товар"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Артикул</label>
              <input
                name="item_number"
                defaultValue={product?.item_number}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Бренд</label>
              <input
                name="brand"
                defaultValue={product?.brand}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Название товара
            </label>
            <input
              name="name"
              defaultValue={product?.name}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Категория
              </label>
              <input
                name="category"
                defaultValue={product?.category}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Цвет</label>
              <input
                name="color"
                defaultValue={product?.color}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Размер</label>
              <input
                type="number"
                step="0.5"
                name="shoe_size"
                defaultValue={product?.shoe_size}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Цена (₽)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                defaultValue={product?.price}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Остаток</label>
              <input
                type="number"
                name="stock_quantity"
                defaultValue={product?.stock_quantity ?? 0}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer cursor-pointer flex-1 py-2 px-4 border border-black/10 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer flex-1 py-2 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
