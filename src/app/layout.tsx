import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { NavigationMenuDemo } from "./_components/Navbar/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "../context/Authcontext"
import Footer from "./_components/Footer/Footer";
import SessionWrapper from "./_components/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "VECTOR",
  description: "Your one-stop shop",
  icons: "/icon.png"
}

const myfont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '800']

})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={myfont.className}
      >
        <SessionWrapper>

          <AuthProvider>
            <NavigationMenuDemo />
            <div className="container mx-auto">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </SessionWrapper>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{ style: { borderRadius: "12px" } }}
        />
      </body>
    </html>
  );
}
