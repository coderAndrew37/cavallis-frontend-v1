import { useEffect, useState } from "react";
import { getAdminAnalytics } from "../services/adminService";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalRevenue: 0,
    topProducts: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl">{analytics.totalSales}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl">${analytics.totalRevenue}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Top Products</h3>
          <ul>
            {analytics.topProducts.map((product, index) => (
              <li key={index} className="text-lg">
                {product.name} - ${product.revenue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
