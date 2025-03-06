import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/adminService";

interface Order {
  _id: string;
  user: string;
  total: number;
  status: string;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status } : order))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-gray-700">
                <td className="p-3">{order.user}</td>
                <td className="p-3">${order.total}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  <select
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
