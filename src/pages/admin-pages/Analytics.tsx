import { useEffect, useState } from "react";
import {
  getSalesTrends,
  getTopProducts,
} from "../../api/adminAnalyticsService";

interface SalesTrend {
  _id: string;
  totalSales: number;
  totalOrders: number;
}

interface TopProduct {
  _id: string;
  totalQuantity: number;
}

const Analytics = () => {
  const [salesTrends, setSalesTrends] = useState<SalesTrend[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await getSalesTrends();
        const productsData = await getTopProducts();
        setSalesTrends(salesData);
        setTopProducts(productsData);
      } catch {
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Sales Analytics</h2>

      {loading ? (
        <p>Loading analytics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* 🔹 Sales Trends */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-2">Sales Trends</h3>
            <ul>
              {salesTrends.map((trend) => (
                <li key={trend._id}>
                  {trend._id}: KSh {trend.totalSales} ({trend.totalOrders}{" "}
                  orders)
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 Top Products */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Top Products</h3>
            <ul>
              {topProducts.map((product) => (
                <li key={product._id}>
                  Product ID {product._id}: {product.totalQuantity} sold
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
