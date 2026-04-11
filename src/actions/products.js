"use server";

import { query } from "@/utils/db";
import { revalidatePath } from "next/cache";

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

//Запрос на создание товара
export async function addProduct(data) {
  try {
    await query(
      `INSERT INTO products (item_number, name, brand, category, shoe_size, color, price, stock_quantity) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        data.item_number,
        data.name,
        data.brand,
        data.category,
        data.shoe_size,
        data.color,
        data.price,
        data.stock_quantity,
      ],
    );
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Ошибка добавления товара:", error);
    return { success: false, error: error.message };
  }
}

//Запрос на изменение товара
export async function updateProduct(productId, data) {
  try {
    await query(
      `UPDATE products 
       SET item_number = $1, name = $2, brand = $3, category = $4, shoe_size = $5, color = $6, price = $7, stock_quantity = $8
       WHERE product_id = $9`,
      [
        data.item_number,
        data.name,
        data.brand,
        data.category,
        data.shoe_size,
        data.color,
        data.price,
        data.stock_quantity,
        productId,
      ],
    );
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Ошибка обновления товара:", error);
    return { success: false, error: error.message };
  }
}

//Запрос на удаление товара
export async function deleteProduct(productId) {
  try {
    await query(`DELETE FROM products WHERE product_id = $1`, [productId]);
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    return { success: false, error: error.message };
  }
}
