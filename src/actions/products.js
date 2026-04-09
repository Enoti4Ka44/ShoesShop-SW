"use server";

import { query } from "@/utils/db";

//Запрос на получение товаров (с поиском, фильтрами и сортировкой)
export async function getProducts(params) {
  const { search, brand, category, color, shoe_size, sort } = params;

  let sql = "SELECT * FROM products WHERE 1=1";
  const queryValues = [];
  let paramIndex = 1;

  if (search) {
    sql += ` AND (name ILIKE $${paramIndex} OR item_number ILIKE $${paramIndex})`;
    queryValues.push(`%${search}%`);
    paramIndex++;
  }

  if (brand) {
    sql += ` AND brand ILIKE $${paramIndex}`;
    queryValues.push(brand);
    paramIndex++;
  }
  if (category) {
    sql += ` AND category ILIKE $${paramIndex}`;
    queryValues.push(category);
    paramIndex++;
  }
  if (color) {
    sql += ` AND color ILIKE $${paramIndex}`;
    queryValues.push(color);
    paramIndex++;
  }

  if (shoe_size) {
    sql += ` AND shoe_size = $${paramIndex}`;
    queryValues.push(shoe_size);
    paramIndex++;
  }

  if (sort === "price_asc") {
    sql += " ORDER BY price ASC";
  } else if (sort === "price_desc") {
    sql += " ORDER BY price DESC";
  } else if (sort === "stock_desc") {
    sql += " ORDER BY stock_quantity DESC";
  } else if (sort === "stock_asc") {
    sql += " ORDER BY stock_quantity ASC";
  } else {
    sql += " ORDER BY product_id DESC";
  }

  try {
    const { rows } = await query(sql, queryValues);
    return rows;
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
    throw new Error("Не удалось получить список товаров");
  }
}
