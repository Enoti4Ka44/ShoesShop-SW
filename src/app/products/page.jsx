import { getProducts } from "@/actions/products";
import ProductCardFunc from "@/components/product-card-func";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts(params);

  console.log(products);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Все товары</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">Товары не найдены</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCardFunc key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
