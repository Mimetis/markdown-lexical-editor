import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ModeToggle } from '@/components/toggle-theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <div className="container min-h-screen flex flex-col gap-4">
            {/* HEADER */}
            <header className="sticky top-0 z-[5] bg-background border-b flex h-16 items-center justify-between py-4">

              <div className="flex flex-1 gap-10">
                <div className="flex flex-row gap-2 content-center hover:cursor-pointer">
                </div>

                <nav className="flex flex-1 justify-end gap-4">
                  <Link
                    key="home"
                    href="/"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    Home
                  </Link>
                  <Link
                    key="serveractions"
                    href="/serveractions"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    Server Actions
                  </Link>
                  <Link
                    key="react-hook"
                    href="/reacthookform"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    React Hook Form
                  </Link>
                  <Link
                    key="customplugin"
                    href="/customplugin"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    Custom Plugin
                  </Link>
                  <ModeToggle />

                </nav>

              </div>
            </header>

            {/* LEFT NAV AND RIGHT CHILDREN */}
            <main className="flex w-full max-w-5xl flex-1 flex-col self-center items-center gap-4 overflow-hidden">
              {children}
            </main>
          </div>
          );
        </ThemeProvider>
      </body>
    </html>
  )
}