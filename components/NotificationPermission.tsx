"use client";
import { useEffect } from "react";

export function NotificationPermission() {
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }
  }, []);
  return null;
} 