import api from "./http";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// 🔹 Fetch Notifications
export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get("/notifications");
  return data;
};

// 🔹 Mark a Notification as Read
export const markAsRead = async (notificationId: string): Promise<void> => {
  await api.patch(`/notifications/${notificationId}/read`);
};

// 🔹 Mark All as Read
export const markAllAsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};
