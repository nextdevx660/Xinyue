import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import PayPalProvider from "./_components/PayPalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Li Xinyue Fans | Official Fanbase, Updates & Community",
  description:
    "Join the official Li Xinyue fans community! Stay updated with the latest photos, videos, projects, and exclusive content about Xinyue. Connect with other fans and celebrate her journey together.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={`${poppins.className}`}
      >
        <PayPalProvider>
          {children}
        </PayPalProvider>
      </body>
    </html>
  );
}
