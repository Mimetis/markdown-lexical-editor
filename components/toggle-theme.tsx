"use client"

import * as React from "react"
import { Github, Laptop, Moon, SunMedium, Twitter } from 'lucide-react';

import { useTheme } from "next-themes"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <>
      <Link href={'https://github.com/Mimetis/markdown-lexical-editor'}
        className={cn(buttonVariants({variant:'outline'}))}>
        <Github className="h-[1.2rem] w-[1.2rem]" />
      </Link>

      <Link href={'https://www.twitter.com/sebpertus'}
        className={cn(buttonVariants({variant:'outline'}))}>
        <Twitter className="h-[1.2rem] w-[1.2rem]" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        {/* suppressHydrationWarning={true} because we can't know which button will be use until theme is resovled */}
          <Button suppressHydrationWarning={true} variant="outline" size="icon">
            <SunMedium className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
