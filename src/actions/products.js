"use server";

import { query } from "@/utils/db";

export const getProducts = async () => {
  const sql = `select * from products`;
  return await query(sql);
};
