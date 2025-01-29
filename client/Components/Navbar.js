"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, User, BarChart3, Users, ShoppingCart, FileText, Settings, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const routes = [
  { name: "Manage Students", path: "/students", icon: Users },
  { name: "Record Purchases", path: "/purchases", icon: ShoppingCart },
  { name: "Account Summary", path: "/summary", icon: FileText },
  { name: "Reports", path: "/reports", icon: BarChart3 },
]

export function Navbar() {
  const pathname = usePathname()
  useEffect(() => {
    const user = localStorage.getItem("IsLoggedin")  
    if (!user && pathname !== "/auth/login") {
      window.location.href = "/auth/login"
    }
  }, [pathname]) 
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-brand-orange flex items-center justify-center">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-brand-navy">CMS</span>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="!h-6 !w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 text-lg",
                    pathname === route.path ? "font-medium text-brand-orange" : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>


        <div className="hidden lg:flex items-center space-x-6 ml-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-orange",
                pathname === route.path ? "text-brand-orange" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

