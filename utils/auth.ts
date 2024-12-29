import { useToast } from "@/hooks/use-toast";

export const logout = async () => {
  const { toast } = useToast();
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      // Clear local storage
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast({
      title: "Logout failed",
      description: "An unexpected error occurred.",
      variant: "destructive",
    });
  }
};
