export function showSystemNotification(title: string, options?: NotificationOptions) {
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(title, {
        ...options,
        icon: "/icon-192x192.png",
      });
    }
  }
} 