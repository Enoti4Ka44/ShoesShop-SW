import { getClients } from "@/actions/clients";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">База клиентов</h1>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Имя Фамилия</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Телефон</th>
              <th className="p-4 font-semibold text-sm">Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.client_id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="p-4 text-sm font-medium">
                  {client.first_name} {client.last_name}
                </td>
                <td className="p-4 text-sm text-gray-600">{client.email}</td>
                <td className="p-4 text-sm text-gray-600">{client.phone}</td>
                <td className="p-4 text-sm text-gray-400">
                  {new Date(client.registration_date).toLocaleDateString(
                    "ru-RU",
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
