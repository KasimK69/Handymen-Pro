
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export const toast = ({ title, description, variant }: ToastProps) => {
  const isDestructive = variant === "destructive";
  
  return sonnerToast[isDestructive ? "error" : "success"](title, {
    description,
    position: "bottom-right",
  });
};

// Import from the main hook to ensure consistency
import { useToast } from "@/hooks/use-toast";
export { useToast };
