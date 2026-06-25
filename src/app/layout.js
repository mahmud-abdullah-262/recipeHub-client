import { Outfit, Radio_Canada } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toast } from "@heroui/react";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const radioCanada = Radio_Canada({
  variable: "--font-Radio-Canada",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "RecipeHub",
  description: "Best Place For User Recipe",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning এখানে থাকা জরুরি
    <html
      suppressHydrationWarning
      lang="en"
      className={`${radioCanada.variable} h-full antialiased`}
    >
      <body className={`font-Radio-Canada min-h-full flex flex-col ${radioCanada.className}`}>
        {/* থিম প্রোভাইডার দিয়ে পুরো অ্যাপ র‍্যাপ করা হলো */}
        <SmoothScrollProvider>

           <ThemeProvider attribute="class" defaultTheme="light">
          <Toast.Provider />
          {children}
        </ThemeProvider>
        </SmoothScrollProvider>
       
      </body>
    </html>
  );
}