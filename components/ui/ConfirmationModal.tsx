"use client";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  isLoading = false,
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />;
      case "warning":
        return <AlertTriangle size={24} className="text-yellow-600 dark:text-yellow-400" />;
      case "info":
        return <Info size={24} className="text-blue-600 dark:text-blue-400" />;
      case "success":
        return <CheckCircle size={24} className="text-green-600 dark:text-green-400" />;
      default:
        return <AlertCircle size={24} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-100 dark:bg-red-900";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "info":
        return "bg-blue-100 dark:bg-blue-900";
      case "success":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700 focus-visible:outline-yellow-600";
      case "info":
        return "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-600";
      case "success":
        return "bg-green-600 hover:bg-green-700 focus-visible:outline-green-600";
      default:
        return "bg-gray-600 hover:bg-gray-700 focus-visible:outline-gray-600";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${getIconBgColor()} flex items-center justify-center`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Confirmation requise
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getConfirmButtonColor()}`}
            >
              {isLoading ? "Confirmation..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 