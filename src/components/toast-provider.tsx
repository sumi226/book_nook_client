"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

type ToastMessage = {
  id: number;
  message: string;
  type: "success" | "error";
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastMessage["type"]) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = useCallback(
    (message: string, type: ToastMessage["type"] = "success") => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, type }]);
      window.setTimeout(
        () => setToasts((current) => current.filter((toast) => toast.id !== id)),
        5000,
      );
    },
    [],
  );
  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite" aria-relevant="additions">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              className={`toast toast-${toast.type}`}
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              {toast.type === "success" ? <Check size={16} /> : <X size={16} />}
              <span>{toast.message}</span>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() =>
                  setToasts((current) =>
                    current.filter((item) => item.id !== toast.id),
                  )
                }
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
