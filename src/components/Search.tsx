import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/http";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ products: any[] }>({ products: [] });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔍 Fetch Search Results
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return setResults({ products: [] });

      try {
        const { data } = await api.get(`/search?q=${query}`);
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
            <p className="text-gray-600 font-bold">Products</p>
          )}
          {results.products.map((p) => (
            <Link
              key={p._id}
              to={`/products/${p._id}`}
              className="block py-1 hover:bg-gray-100 p-1 rounded"
            >
              {p.name} - Ksh {p.price}
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
