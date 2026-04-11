import { getAllSales } from "@/actions/sales";
import ReturnButton from "../../components/return-button";

export default async function SalesPage() {
  const sales = await getAllSales();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">История продаж</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1 justify-center">
        {sales.map((sale) => (
          <div
            key={sale.sale_id}
            className="bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 p-4 border-b border-black/20 flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-gray-900">
                  Заказ №{sale.sale_id}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {new Date(sale.sale_date).toLocaleDateString("ru-RU")}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {sale.first_name} {sale.last_name}
                </p>
                <p className="text-xs text-gray-500">{sale.phone}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {sale.items.map((item) => (
                  <div
                    key={item.sale_item_id}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.product_name}</p>
                      <p className="text-xs text-gray-400">
                        Арт: {item.item_number} • {item.quantity} шт.
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold">
                        {item.unit_price} ₽
                      </span>

                      {item.is_returned ? (
                        <span className="text-center text-xs font-bold text-white bg-red-400 px-2 py-1.5 rounded">
                          Возврат оформлен
                        </span>
                      ) : (
                        <ReturnButton saleItemId={item.sale_item_id} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 flex justify-between items-center border-t border-black/20">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Оплата: {sale.payment_method}
              </span>
              <span className="text-xl font-black">
                {Number(sale.total_amount).toLocaleString()} ₽
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
