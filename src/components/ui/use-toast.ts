import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (options: { title: string; variant?: "default" | "destructive" }) => {
      if (options.variant === "destructive") {
        sonnerToast.error(options.title);
      } else {
        sonnerToast.success(options.title);
      }
    },
  };
}

