import { createContext, useState, useEffect } from "react";
import api from "../api/http";

// Define Cart Item Type
type CartItem = {
  _id: string;
  productId: { _id: string; name: string; price: number };
  quantity: number;
};

// Define Cart Context Type
type CartContextType = {
  cart: CartItem[];
  total: number;
  addToCart: (productId: string, quantity: number) => void;
  updateCartItem: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Cart Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Fetch Cart from Backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get<CartItem[]>("/cart");
        setCart(data);
        calculateTotal(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Calculate Total Price
  const calculateTotal = (cartItems: CartItem[]) => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // Add Item to Cart
  const addToCart = async (productId: string, quantity: number) => {
    try {
      const { data } = await api.post<CartItem[]>("/cart", {
        productId,
        quantity,
      });
      setCart(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // Update Cart Item Quantity
  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      const { data } = await api.patch<CartItem[]>(`/cart/${cartItemId}`, {
        quantity,
      });
      setCart(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  // Remove Item from Cart
  const removeFromCart = async (cartItemId: string) => {
    try {
      const { data } = await api.delete<CartItem[]>(`/cart/${cartItemId}`);
      setCart(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart([]);
      setTotal(0);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
