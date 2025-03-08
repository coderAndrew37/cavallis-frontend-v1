import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/http";
import { FaSearch } from "react-icons/fa";

// ✅ Define a lightweight Product type for search results
interface ProductSearchResult {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ products: ProductSearchResult[] }>({
    products: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔍 Fetch Search Results
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return setResults({ products: [] });

      try {
        const { data } = await api.get<{
          results: { products: ProductSearchResult[] };
        }>(`/search?q=${query}`);
        setResults(data.results);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔹 Handle Enter Key to Navigate
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="p-2 w-64 md:w-80 border-none outline-none"
        />
        <button type="submit" className="bg-green-600 text-white p-2">
          <FaSearch />
        </button>
      </form>

      {/* 🔹 Dropdown Results */}
      {isOpen && query && (
        <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-50 p-2 max-h-64 overflow-y-auto">
          {results.products.length > 0 && (
            <p className="text-gray-600 font-bold mb-2">Products</p>
          )}

          {/* ✅ Render Products as Cards */}
          {results.products.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="block bg-white shadow-md rounded-lg p-3 flex items-center space-x-4 hover:bg-gray-100 transition"
            >
              <img
                src={p.images?.[0] || "/default-product.jpg"} // ✅ Use first image or fallback
                alt={p.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-green-600 font-bold">Ksh {p.price}</p>
              </div>
            </Link>
          ))}

          {results.products.length === 0 && (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
