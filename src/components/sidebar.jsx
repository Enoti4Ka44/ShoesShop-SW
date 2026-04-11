"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ currentParams }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: currentParams.search || "",
    category: currentParams.category || "",
    brand: currentParams.brand || "",
    color: currentParams.color || "",
    shoe_size: currentParams.shoe_size || "",
    sort: currentParams.sort || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      brand: "",
      color: "",
      shoe_size: "",
      sort: "",
    });
    router.push("/");
  };

  return (
    <form onSubmit={applyFilters} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Поиск</label>
        <input
          type="text"
          name="search"
          placeholder="Название или артикул..."
          value={filters.search}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Категория</label>
        <input
          type="text"
          name="category"
          placeholder="Например: Кроссовки"
          value={filters.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Бренд</label>
        <input
          type="text"
          name="brand"
          placeholder="Например: Nike"
          value={filters.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Цвет</label>
        <input
          type="text"
          name="color"
          placeholder="Например: Черный"
          value={filters.color}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Размер (EU)</label>
        <input
          type="number"
          step="0.5"
          name="shoe_size"
          placeholder="Например: 42.5"
          value={filters.shoe_size}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Сортировка</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm"
        >
          <option value="">По умолчанию</option>
          <option value="price_asc">Сначала дешевые</option>
          <option value="price_desc">Сначала дорогие</option>
          <option value="stock_desc">По наличию (много)</option>
          <option value="stock_asc">По наличию (мало)</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <button
          type="submit"
          className="cursor-pointer bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
        >
          Применить
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition"
        >
          Сбросить
        </button>
      </div>
    </form>
  );
}
