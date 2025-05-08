import { useEffect } from "react";

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  position?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight";
  onClose: (id: string) => void;
}

const Toast = ({
  id,
  title,
  description,
  duration = 3000,
  position = "top",
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const positionClasses = {
    top: "top-4 left-1/2 -translate-x-1/2",
    topLeft: "top-4 left-4",
    topRight: "top-4 right-4",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    bottomLeft: "bottom-4 left-4",
    bottomRight: "bottom-4 right-4",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 min-w-[320px] max-w-[420px] bg-gray-800 text-white rounded-lg shadow-lg border border-gray-400 transition-all duration-300 ease-in-out animate-fade-in`}
      role="alert"
    >
      <div className="p-4">
        <div className="mb-1 font-semibold">{title}</div>
        {description && <div className="text-sm text-white/60">{description}</div>}
      </div>
    </div>
  );
};

export default Toast;
