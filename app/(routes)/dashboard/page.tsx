"use client"
import { useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Dashboard = () => {

  

  return (
    <div className="relative w-full flex justify-center overflow-y-scroll">
      <div className="relative flex flex-col w-full min-h-screen max-w-screen-2xl bg-green-100 rounded-3xl my-[24px] px-[32px] h-full">
        <div className="w-full h-[128px] text-black text-[36px] font-semibold flex items-center justify-start mt-2">
          Summary of your spending!
        </div>
        <div className="w-full h-[36px] text-black text-[16px] font-semibold flex items-center justify-start mt-[-48px]">
          Manage your spending has never been easier!
        </div>
        <div className="h-[312px] grid grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard