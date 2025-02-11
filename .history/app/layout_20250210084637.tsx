import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventurer app",
  description: "Share your adventure experience here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
