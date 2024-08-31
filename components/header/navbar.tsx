import { Logo } from "./logo"
import { Navigation } from "./navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Actions } from "./actions"


export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-center h-[128px] py-8 border-green border-b-2 z-10">
      
      <div className="w-full max-w-screen-2xl h-[64px] grid grid-cols-12 gap-8 px-[96px]">
        <Link className="h-full col-span-2 flex items-center gap-2" href="/">
          <Logo size={48}/>
          <div className="text-[28px] font-semibold">
            Bycel
          </div>
        </Link>
        <div className="relative h-full col-span-6">
          <Navigation />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2 flex items-center gap-8 justify-end text-[18px]">
          <Actions />
        
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/background.png')] filter blur-[2px] -z-20"></div>
      </div>
    </header>
  )
}