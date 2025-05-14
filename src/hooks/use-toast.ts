
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

export const useToast = () => {
  return { toast };
};
