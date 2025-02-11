import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-gray-100 dark:bg-gray-900 antialiased`}
    >
      {children}
    </div>
  );
}
