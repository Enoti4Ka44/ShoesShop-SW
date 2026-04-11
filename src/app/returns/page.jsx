import { getReturns } from "@/actions/sales";
import DeleteReturnButton from "@/components/delete-return-button";

export default async function ReturnsPage() {
  const returns = await getReturns();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Возвраты товаров</h1>

      {returns.length === 0 ? (
        <div className=" text-center text-gray-500">
          Возвратов пока не было.
        </div>
      ) : (
        <div className="overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Дата
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Товар
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Клиент
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Сумма возврата
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600 text-right">
                  Действие
                </th>
              </tr>
            </thead>
            <tbody>
              {returns.map((item) => (
                <tr
                  key={item.return_id}
                  className="border-b border-black/20 last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(item.return_date).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.product_name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.brand} | Арт: {item.item_number}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {item.first_name} {item.last_name}
                  </td>
                  <td className="p-4 text-sm font-bold text-red-600">
                    -{Number(item.refund_amount).toLocaleString("ru-RU")} ₽
                  </td>
                  <td className="p-4 text-right">
                    <DeleteReturnButton returnId={item.return_id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
