import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import ThemeToggle from "@/components/ThemeToggle"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "User Directory",
  description: "A directory of users",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
            <nav className="bg-white dark:bg-gray-800 shadow-md">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                  href="/"
                  className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  User Directory
                </Link>
                <ThemeToggle />
              </div>
            </nav>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
              <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
                &copy; 2023 User Directory. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
