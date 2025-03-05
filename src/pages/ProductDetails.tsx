import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/http";
import ProductSkeleton from "../components/ProductSkeleton";
import CartContext from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toast CSS

// ✅ Define Product Type
type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  benefits: string[];
  ingredients: string[];
  images: string[];
  stock: number;
  isBestseller: boolean;
  discountBadge: string;
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [recommended, setRecommended] = useState<Product[]>([]); // 🔹 Store recommended products

  const { addToCart } = useContext(CartContext) || {};
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get<Product>(`/products/${productId}`);
        setProduct(data);
        fetchRecommendedProducts(data.category); // 🔹 Fetch similar products
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Fetch recommended products based on category
  const fetchRecommendedProducts = async (category: string) => {
    try {
      const { data } = await api.get(`/products?category=${category}&limit=4`);
      setRecommended(data.products);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart!"); // 🔥 Show error toast
      navigate("/login");
      return;
    }

    if (addToCart && product) {
      addToCart(product._id, quantity);
      toast.success(`${quantity}x ${product.name} added to cart! ✅`); // ✅ Success toast
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        {loading && <ProductSkeleton />}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {product && (
          <div className="bg-white shadow-lg p-6 rounded-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 🔹 Product Image Gallery */}
              <div>
                <img
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-md"
                />
                <div className="flex mt-2 space-x-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover rounded cursor-pointer border hover:border-blue-500"
                    />
                  ))}
                </div>
              </div>

              {/* 🔹 Product Details */}
              <div>
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <p className="text-green-600 text-xl font-bold">
                  KSh {product.price.toLocaleString()}
                </p>
                {product.discountBadge && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {product.discountBadge}
                  </span>
                )}

                <p className="mt-4 text-gray-700">{product.description}</p>

                {/* 🔹 Stock Availability */}
                <p
                  className={`mt-2 ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>

                {/* 🔹 Category */}
                <p className="mt-2">
                  <strong>Category:</strong> {product.category}
                </p>

                {/* 🔹 Benefits */}
                {product.benefits.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Benefits:</h3>
                    <ul className="list-disc ml-6 text-gray-700">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🔹 Ingredients */}
                {product.ingredients.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Ingredients:</h3>
                    <ul className="list-disc ml-6 text-gray-700">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🔹 Quantity Selector */}
                {product.stock > 0 && (
                  <div className="mt-4 flex items-center">
                    <label className="mr-2">Quantity:</label>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded-l"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-12 text-center border"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      className="px-2 py-1 bg-gray-300 rounded-r"
                      onClick={() =>
                        setQuantity((prev) => Math.min(product.stock, prev + 1))
                      }
                    >
                      +
                    </button>
                  </div>
                )}

                {/* 🔹 Add to Cart Button */}
                <button
                  className={`mt-6 px-6 py-2 rounded text-white ${
                    product.stock > 0
                      ? "bg-blue-500 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>

            {/* 🔹 Recommended Products */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold">You may also like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {recommended.map((rec) => (
                  <div key={rec._id} className="bg-white shadow p-4 rounded-lg">
                    <img
                      src={rec.images[0]}
                      alt={rec.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <h4 className="text-lg font-semibold mt-2">{rec.name}</h4>
                    <p className="text-green-600 font-bold">
                      KSh {rec.price.toLocaleString()}
                    </p>
                    <a href={`/products/${rec._id}`} className="text-blue-500">
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
