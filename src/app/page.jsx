import { getProducts } from "@/actions/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      {products.map((p) => (
        <Card key={p.product_id}>
          <CardContent>{p.name}</CardContent>
        </Card>
      ))}
    </div>
  );
}
