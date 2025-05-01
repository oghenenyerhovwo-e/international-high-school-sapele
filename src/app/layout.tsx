// modules
import type { Metadata } from "next";

// components
import {
  ThemeProvider,
} from "@/components";

// objects and functions
import { Geist, Geist_Mono } from "next/font/google";

// css
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "After-School Lessons Hub | Connect with International School Teachers for Extra Learning",
  description: "Discover a wide range of high-quality after-school lessons offered by experienced teachers at your child’s school. Easily find lessons by subject, teacher, or class, and connect directly via call or WhatsApp. Start your child’s learning journey today!",
};
// attribute="data-theme"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
