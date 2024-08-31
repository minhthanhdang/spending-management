"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useMedia } from "react-use"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: 'Scan',
    href: '/scan',
  },
  {
    label: 'Account',
    href: '/account',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <nav className="w-full h-full flex items-center text-[#E2E2E2] gap-10 ">
      {routes.map((route) => (
        <Button
          key={route.href}
          asChild
          size="sm"
          variant="outline"
          className={cn(
            "min-w-[64px] w-full lg:w-auto font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transtion flex justify-center text-[16px]",
            pathname == route.href ? "bg-white/10 text-white" : "bg-transparent",
          )}
        >
          <Link href={route.href}>
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
  
}

