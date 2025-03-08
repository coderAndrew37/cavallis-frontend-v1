import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/adminProductsService";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Handle Product Creation
  const handleCreateProduct = async () => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: "", price: 0, stock: 0, category: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // 🔹 Handle Product Update
  const handleUpdateProduct = async (
    id: string,
    updatedData: Partial<Product>
  ) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // 🔹 Handle Product Deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Product Management</h2>

      {/* 🔹 Create New Product */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: Number(e.target.value) })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>

      {/* 🔹 Products Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">KSh {product.price.toLocaleString()}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() =>
                        handleUpdateProduct(product._id, {
                          name: "Updated Name",
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
