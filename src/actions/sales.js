"use server";

import { query } from "@/utils/db";
import { revalidatePath } from "next/cache";

//Запрос на покупку товаров из корзины
export async function processCheckout(formData, cartItems) {
  try {
    const { first_name, last_name, email, phone, payment_method } = formData;
    const cartJson = JSON.stringify(cartItems);

    const result = await query(
      `SELECT checkout_full_order($1, $2, $3, $4, $5, $6) AS sale_id`,
      [first_name, last_name, email, phone, payment_method, cartJson],
    );

    return { success: true, saleId: result.rows[0].sale_id };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: error.message };
  }
}

//Запрос на получение всех продаж с клиентами
export async function getAllSales() {
  try {
    const sql = `
      SELECT 
        s.sale_id, 
        s.sale_date, 
        s.total_amount, 
        s.payment_method,
        c.first_name, 
        c.last_name, 
        c.email, 
        c.phone,
        json_agg(json_build_object(
          'sale_item_id', si.sale_item_id,
          'product_name', p.name,
          'item_number', p.item_number,
          'quantity', si.quantity,
          'unit_price', si.unit_price,
          'is_returned', (SELECT EXISTS(SELECT 1 FROM returns r WHERE r.sale_item_id = si.sale_item_id))
        )) as items
      FROM sales s
      JOIN clients c ON s.client_id = c.client_id
      JOIN sale_items si ON s.sale_id = si.sale_id
      JOIN products p ON si.product_id = p.product_id
      GROUP BY s.sale_id, c.client_id
      ORDER BY s.sale_date DESC;
    `;
    const { rows } = await query(sql);
    return rows;
  } catch (error) {
    console.error("Ошибка при получении продаж:", error);
    return [];
  }
}

//Запрос на возврат товара
export async function createReturn(saleItemId) {
  try {
    const check = await query("SELECT 1 FROM returns WHERE sale_item_id = $1", [
      saleItemId,
    ]);
    if (check.rowCount > 0)
      throw new Error("Возврат по этому товару уже оформлен");

    const itemData = await query(
      "SELECT unit_price FROM sale_items WHERE sale_item_id = $1",
      [saleItemId],
    );

    if (itemData.rowCount === 0) {
      throw new Error(" Запись о продаже не найдена");
    }

    const refundAmount = itemData.rows[0].unit_price;

    await query(
      `INSERT INTO returns (sale_item_id, return_date, refund_amount) 
       VALUES ($1, CURRENT_DATE, $2)`,
      [saleItemId, refundAmount],
    );

    revalidatePath("/sales");
    return { success: true };
  } catch (error) {
    console.error("Ошибка в createReturn:", error.message);
    return { success: false, error: error.message };
  }
}
