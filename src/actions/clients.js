"use server";

import { query } from "@/utils/db";

export async function getClients() {
  try {
    const { rows } = await query(
      "SELECT * FROM clients ORDER BY registration_date DESC",
    );
    return rows;
  } catch (error) {
    console.error("Ошибка при получении списка клиентов:", error);
    return [];
  }
}
