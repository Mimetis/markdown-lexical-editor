import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <div className="container min-h-screen flex flex-col gap-4">
            {/* HEADER */}
            <header className="sticky top-0 z-[5] bg-background flex items-center justify-between py-4">

              <div className="flex flex-1 gap-10 text-xs sm:text-xs md:text-lg">

                <nav className="flex flex-col md:flex-row flex-1 justify-end">
                  <div className='flex flex-row flex-1 justify-end gap-4 p-3 flex-nowrap'>

                    <Link
                      key="home"
                      href="/"
                      className='flex items-center font-medium transition-colors hover:text-foreground/80 text-foreground' >
                      Home
                    </Link>
                    <Separator orientation="vertical"  />
                    <Link
                      key="serveractions"
                      href="/serveractions"
                      className='flex items-center font-medium transition-colors hover:text-foreground/80 text-foreground' >
                      Server Actions
                    </Link>
                    <Separator orientation="vertical"  />
                    <Link
                      key="react-hook"
                      href="/reacthookform"
                      className='flex items-center font-medium transition-colors hover:text-foreground/80 text-foreground' >
                      React Hook Form
                    </Link>
                    <Separator orientation="vertical" />
                    <Link
                      key="customplugin"
                      href="/customplugin"
                      className='flex items-center font-medium transition-colors hover:text-foreground/80 text-foreground' >
                      Custom Plugin
                    </Link>
                    <Separator orientation="vertical"  className='hidden md:block' />
                  </div>
                  <div className='flex justify-start md:justify-end gap-4'>
                    <ModeToggle />
                  </div>

                </nav>

              </div>
            </header>

            {/* LEFT NAV AND RIGHT CHILDREN */}
            <main className="flex w-full max-w-5xl flex-1 flex-col self-center items-center gap-4 overflow-hidden">
              <h1 className='self-start text-2xl sm:text-3xl md:text-5xl lg:leading-[1.1] font-bold leading-tight tracking-tighter '>Markdown WYSIWYG Editor</h1>
              <Label className='max-w-[750px] text-base md:text-lg text-muted-foreground sm:text-xl self-start'>
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
              <Separator className="md:my-4" />
              {children}
            </main>
          </div>
          );
        </ThemeProvider>
      </body>
    </html>
  )
}
