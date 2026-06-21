import {  Outfit, Radio_Canada } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toast } from "@heroui/react";


const radioCanada = Radio_Canada({
  variable: "--font-Radio-Canada",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})



export const metadata = {
  title: "RecipeHub",
  description: "Best Place For User Recipe",
};

export default function RootLayout({ children }) {
  return (
    <html
    suppressHydrationWarning
      lang="en"
     
      className={`${radioCanada.variable} h-full antialiased `}
    >
         <Toast.Provider />
      <body className={`font-Radio-Canada min-h-full flex flex-col ${radioCanada.className}`}>
      
        
            {children}
        
           
    
        
       </body>
    </html>
  );
}
