import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex items-center justify-center bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
