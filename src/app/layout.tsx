import type { Metadata } from "next";
import "./globals.css";
import { Rethink_Sans, Shadows_Into_Light } from 'next/font/google'

const shadowsintolight = Shadows_Into_Light({
  subsets: ['latin'],
  weight: ['400', '400'],
  variable: '--font-shadowsintolight',
})

const rethink = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-rethink',
})

export const metadata: Metadata = {
  title: "Golf Links Fish Bar",
  description: "Golf Links Fish and Burger Bar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shadowsintolight.variable} ${rethink.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col px-8 py-8">{children}</body>
    </html>
  );
}
