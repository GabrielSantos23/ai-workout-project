"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { UserGoalProvider } from "@/contexts/UserGoalContext";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsAuthPage(
      pathname === "/login" || pathname === "/register" || pathname === "/"
    );
    setLoading(false);
  }, [1000]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="spinner border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (isAuthPage) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <UserGoalProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </UserGoalProvider>
  );
}
