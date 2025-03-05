import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/http";
import ProductSkeleton from "./ProductSkeleton"; // ✅ Import Skeleton component

// ✅ Define Product Type
type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<{ products: Product[] }>(
          "/products?limit=3"
        );
        setProducts(data.products);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Best-Selling Herbal Medicines
        </h2>

        {/* 🔹 Show error message if API call fails */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? // 🔹 Show skeletons while loading
              Array(3)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            : // 🔹 Show actual products when loaded
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg p-4 rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                  <p className="text-green-600 font-bold">
                    KSh {product.price.toLocaleString()}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
