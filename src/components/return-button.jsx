"use client";

import { createReturn } from "@/actions/sales";

export default function ReturnButton({ saleItemId }) {
  const handleReturn = async (saleItemId) => {
    try {
      const result = await createReturn(saleItemId);
      console.log("suc");
      if (!result.success) {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={() => handleReturn(saleItemId)}
      className="text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-600 px-3 py-1.5 rounded-md transition"
    >
      Сделать возврат
    </button>
  );
}
