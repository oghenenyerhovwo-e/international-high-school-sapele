// modules
import type { Metadata } from "next";

// components
import {
  ThemeProvider,
} from "@/components";

// objects and functions
import { Roboto, Poppins } from "next/font/google";

// css
import "./globals.css";

// app/layout.js or _document.js

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose weights you need
  variable: "--font-roboto",
});


export const metadata: Metadata = {
  title: "After-School Lessons Hub | Connect with International School Teachers for Extra Learning",
  description: "Discover a wide range of high-quality after-school lessons offered by experienced teachers at your child’s school. Easily find lessons by subject, teacher, or class, and connect directly via call or WhatsApp. Start your child’s learning journey today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
