import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50">
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
