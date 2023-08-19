import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ModeToggle } from '@/components/toggle-theme'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ExternalLink } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Markdown WYSIWYG Editor',
  description: 'A Markdown WYSIWYG Editor for React applications, using shadcn/ui library and lexical framework.',
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
                  <Separator orientation="vertical" />
                  <Link
                    key="serveractions"
                    href="/serveractions"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    Server Actions
                  </Link>
                  <Separator orientation="vertical" />
                  <Link
                    key="react-hook"
                    href="/reacthookform"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    React Hook Form
                  </Link>
                  <Separator orientation="vertical" />
                  <Link
                    key="customplugin"
                    href="/customplugin"
                    className='flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground' >
                    Custom Plugin
                  </Link>
                  <Separator orientation="vertical" />
                  <ModeToggle />

                </nav>

              </div>
            </header>

            {/* LEFT NAV AND RIGHT CHILDREN */}
            <main className="flex w-full max-w-5xl flex-1 flex-col self-center items-center gap-4 overflow-hidden">
              <h1 className='self-start text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]'>Markdown WYSIWYG Editor</h1>
              <Label className='max-w-[750px] text-lg text-muted-foreground sm:text-xl self-start'>
                Add and customize a Markdown WYSIWYG editor in your React application. Uses
                <Link href={'https://ui.shadcn.com/'} className='m-1 underline inline-flex items-center gap-2'>shadcn/ui
                  <ExternalLink className="w-3 h-3 " strokeWidth='2px' />
                </Link>
                library and
                <Link href={'https://lexical.dev/'} className='m-1 underline inline-flex items-center gap-2'>lexical editor
                  <ExternalLink className="w-3 h-3 " strokeWidth='2px' />
                </Link>
                framework.
              </Label>
              <Separator className="my-4" />
              {children}
            </main>
          </div>
          );
        </ThemeProvider>
      </body>
    </html>
  )
}
