"use client"
import { useEffect } from "react"
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { MONTHS } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import { set } from "date-fns";
import { MonthlySpending } from "./_components/monthly-spending";
import { CategoryPie } from "./_components/category-pie";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const Dashboard = () => {

  const [monthlySpending, setMonthlySpending] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("/api/summary/monthly/getTotalSpending")
      .then((res) => {
        console.log(res.data)
        setMonthlySpending(res.data)

        let chartData = res.data.totalSpendings.map((value: number, index: number) => ({month: MONTHS[index], spent: value}))
        console.log(chartData)
        setChartData(chartData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  return (
    <div className="fixed h-[100vh] w-full flex justify-center overflow-y-scroll bg-gradient-to-tl from-[#07fc2cce] from-10% to-[#bcfbce] to-90%">
      <div className="relative flex flex-col w-full min-h-screen max-w-screen-2xl rounded-3xl my-[24px] px-[48px] h-full overflow-y-scroll">
        <div>
          <div className="w-full h-[128px] text-black text-[40px] font-semibold flex items-center justify-start mt-2">
            Summary of your spending!
          </div>
          <div className="w-full h-[36px] text-black text-[20px] font-semibold flex items-center justify-start mt-[-48px]">
            Manage your spending has never been easier!
          </div>
        </div>
        <div className="h-[312px] grid grid-cols-3 gap-x-4 mt-8">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Your Spending Trend</CardTitle>
              <CardDescription>Total spending each month</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <MonthlySpending />
          <CategoryPie />
        </div>
        



      </div>
    </div>
  )
}

export default Dashboard