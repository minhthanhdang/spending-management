"use client"

import { Button } from "../ui/button"
import Link from "next/link"
import { useAuth, UserButton } from "@clerk/nextjs"
export const Actions = () => {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn 
        ? (
          <div className="w-full flex justify-end">
            <UserButton appearance={{elements: {userButtonAvatarBox: "w-12 h-12"}}}/>
          </div>
          
      ) : (
        <>
        <Button
          asChild
          size="sm"
          variant="outline"
          className=
            "min-w-[64px] w-full lg:w-auto hover:bg-white/20  border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white hover:text-white focus:bg-white/30 transtion flex justify-center bg-transparent font-normal"
        >
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className=
            "min-w-[64px] w-full lg:w-auto hover:bg-white/20  border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white hover:text-white focus:bg-white/30 transtion flex justify-center bg-transparent font-normal px-4"
        >
          <Link href="/sign-up">
            Sign Up
          </Link>
        </Button>
        </>
      )}
    </>
  )
}