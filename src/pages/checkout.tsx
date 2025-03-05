import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, total, updateCartItem, removeFromCart } = useContext(
    CartContext
  ) || { cart: [], total: 0 };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto max-w-4xl bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          {cart.length === 0 ? (
            <p>
              Your cart is empty.{" "}
              <Link to="/products" className="text-blue-500">
                Shop now
              </Link>
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>
                  {item.productId.name} (x{item.quantity})
                </span>
                <span>KSh {item.productId.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart && removeFromCart(item._id)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-12 border text-center"
                  onChange={(e) =>
                    updateCartItem &&
                    updateCartItem(item._id, parseInt(e.target.value))
                  }
                />
              </div>
            ))
          )}
          <p className="text-lg font-bold mt-2">Total: KSh {total}</p>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
