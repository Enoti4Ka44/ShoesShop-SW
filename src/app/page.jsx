import { getProducts } from "@/actions/products";

export default async function Home() {
  const products = await getProducts();

  return <div>{products.map((p) => p.name)}</div>;
}
