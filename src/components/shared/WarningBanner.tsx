"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WarningBannerProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose?: () => void;
}

export function WarningBanner({
  message,
  duration = 5000,
  onClose,
}: WarningBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300); // Animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "  fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
        "w-[90vw] max-w-md",
        "bg-yellow-500 text-yellow-950 px-4 py-3 rounded-lg shadow-lg",
        "flex items-center justify-between",
        "transition-all duration-300",
        isLeaving
          ? "opacity-0 translate-y-[-100%]"
          : "opacity-100 translate-y-0 animate-slide-down"
      )}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-2 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-medium text-sm">{message}</p>
      </div>
    </div>
  );
}
