export default function ProductCard({ product }) {
  return (
    <div className="border border-black/10 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.brand}
          </span>
          <span className="text-xs text-gray-400">
            Арт: {product.item_number}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {product.category} • {product.color}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">
            Размер: {product.shoe_size}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-md ${product.stock_quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            В наличии: {product.stock_quantity}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 mt-auto">
        <span className="text-xl font-black">
          {Number(product.price).toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </div>
  );
}
