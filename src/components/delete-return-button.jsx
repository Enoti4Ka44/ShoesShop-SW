"use client";

import { deleteReturn } from "@/actions/sales";

export default function DeleteReturnButton({ returnId }) {
  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите отменить возврат?")) {
      const result = await deleteReturn(returnId);
      if (!result.success) {
        alert("Ошибка: " + result.error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer w-full py-2 px-3 rounded-md font-medium transition-colors bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 text-sm"
    >
      Отменить возврат
    </button>
  );
}
