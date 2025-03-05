import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/http";
import ProductSkeleton from "../components/ProductSkeleton";

// ✅ Define Product Type
type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

// ✅ Define API Response Type
type ApiResponse = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(""); // Filtering
  const [sort, setSort] = useState(""); // Sorting

  // 🔹 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<ApiResponse>(
          `/products?page=${page}&category=${category}&sort=${sort}`
        );
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category, sort]); // Runs when page, category, or sort changes

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          All Products
        </h2>

        {/* 🔹 Filter & Sorting Options */}
        <div className="flex justify-between mb-6">
          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="herbal">Herbal</option>
            <option value="supplements">Supplements</option>
            <option value="superfoods">Superfoods</option>
          </select>

          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {/* 🔹 Show error message if API call fails */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* 🔹 Display Product Cards or Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? Array(6)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            : products.map((product) => (
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
                    to={`/products/${product._id}`}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              ))}
        </div>

        {/* 🔹 Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
