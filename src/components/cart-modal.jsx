"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";
import { checkoutCart } from "@/actions/sales";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (cart.length === 0 && !isOpen) return null;

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    setLoading(true);
    // Отправляем данные корзины в наш серверный экшен
    const result = await checkoutCart(cart);
    setLoading(false);

    if (result.success) {
      alert(`Заказ #${result.saleId} успешно оформлен!`);
      clearCart();
      setIsOpen(false);
      // Обновляем страницу, чтобы подтянулись новые остатки товаров (stock_quantity)
      router.refresh();
    } else {
      alert(`Ошибка: ${result.error}`);
    }
  };

  return (
    <>
      {/* Кнопка открытия корзины */}
      {!isOpen && cart.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg font-bold hover:bg-gray-800"
        >
          Корзина ({cart.length})
        </button>
      )}

      {/* Окно корзины */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl p-6 flex flex-col border-l z-50">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold">Ваш заказ</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              Закрыть ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-sm leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.price} ₽</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    className="w-6 h-6 bg-gray-100 rounded text-sm font-bold hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.stock_quantity}
                    className="w-6 h-6 bg-gray-100 rounded text-sm font-bold hover:bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="ml-2 text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Итого:</span>
              <span>{totalAmount.toLocaleString("ru-RU")} ₽</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Оформляем..." : "Оплатить"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
