
import { toast as sonnerToast } from "sonner";
import { useState } from "react";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

// Create a mock toasts array to satisfy the toaster component
const toastsStore: { id: string; title: string; description?: string }[] = [];

export const toast = ({ title, description, variant }: ToastProps) => {
  const isDestructive = variant === "destructive";
  
  // Generate a unique ID for each toast
  const id = Math.random().toString(36).substring(2, 9);
  
  // Store toast in our local array for compatibility with the toaster component
  toastsStore.push({ id, title, description });
  
  return sonnerToast[isDestructive ? "error" : "success"](title, {
    description,
    position: "bottom-right",
    id,
  });
};

export const useToast = () => {
  // We're creating a fake state here just to satisfy the component
  // The actual toasts are managed by sonner
  const [_, setToasts] = useState(toastsStore);
  
  return { 
    toast,
    toasts: toastsStore
  };
};
