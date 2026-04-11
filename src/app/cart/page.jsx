"use client";

import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";
import { processCheckout } from "@/actions/sales";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      payment_method: e.target.payment_method.value,
    };

    const result = await processCheckout(formData, cart);

    if (result.success) {
      alert("Заказ успешно оформлен!");
      clearCart();
      router.push("/");
      router.refresh();
    } else {
      alert("Ошибка: " + result.error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Ваш заказ</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm"
            >
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.brand} | {item.color} | {item.shoe_size}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:bg-gray-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-50 cursor-pointer"
                      disabled={item.quantity >= item.stock_quantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="text-red-500 text-sm hover:underline cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="text-right font-bold text-lg">
                {(item.price * item.quantity).toLocaleString()} ₽
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-4 flex justify-between items-center text-2xl font-black">
          <span>Итого:</span>
          <span>{total.toLocaleString()} ₽</span>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border">
        <h2 className="text-2xl font-bold mb-6">Данные покупателя</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <input
                name="first_name"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Фамилия</label>
              <input
                name="last_name"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Телефон</label>
            <input
              name="phone"
              type="tel"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Способ оплаты
            </label>
            <select
              name="payment_method"
              className="w-full p-2 border rounded-md"
            >
              <option value="Card">Карта</option>
              <option value="Cash">Наличные</option>
            </select>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-4 rounded-xl font-bold text-lg mt-6 hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            Оплатить {total.toLocaleString()} ₽
          </button>
        </form>
      </div>
    </div>
  );
}
