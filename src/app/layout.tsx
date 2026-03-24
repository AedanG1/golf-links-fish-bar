import type { Metadata } from "next";
import "./globals.css";
import { Lato, Oooh_Baby, Rethink_Sans } from 'next/font/google'

const ooohbaby = Oooh_Baby({
  subsets: ['latin'],
  weight: ['400', '400'],
  variable: '--font-ooohbaby',
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
      className={`${ooohbaby.variable} ${rethink.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col px-8 py-8">{children}</body>
    </html>
  );
}
