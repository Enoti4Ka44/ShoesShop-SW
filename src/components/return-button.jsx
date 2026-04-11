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
      className="cursor-pointer text-xs font-semibold bg-black text-white hover:bg-black/70 px-3 py-1.5 rounded transition"
    >
      Сделать возврат
    </button>
  );
}
