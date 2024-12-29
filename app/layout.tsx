import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/app/globals.css";
import LayoutContent from "@/components/layout-content";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <SidebarProvider>
          <LayoutContent>{children}</LayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
