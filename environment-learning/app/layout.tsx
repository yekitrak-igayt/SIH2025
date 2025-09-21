import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TerraLearn - Smart India Hackathon 2024",
  description:
    "Gamified Environmental Education Platform - Empowering students to learn sustainability through interactive challenges and real-world actions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}