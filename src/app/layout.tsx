import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "TruckLoad | Sàn Giao Dịch Vận Tải Hai Chiều",
  description: "Sàn kết nối hàng hóa và phương tiện vận tải đường bộ hai chiều tối ưu hóa xe về rỗng và ký quỹ Escrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
