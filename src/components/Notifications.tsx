import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../api/notificationsService";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // ✅ Mark a Single Notification as Read
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // ✅ Mark All Notifications as Read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
        Notifications
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Mark All as Read
          </button>
        )}
      </h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`border-b py-2 px-3 rounded ${
                notification.read ? "text-gray-500" : "text-black font-semibold"
              } flex justify-between items-center`}
            >
              <span>{notification.message}</span>
              <div className="text-xs text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification._id)}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded ml-2"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
