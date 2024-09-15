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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import { MONTHS } from "@/lib/constants";
const chartConfig = {
  spent: {
    label: "Spent",
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

export const MonthlySpending = () => {

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
    <Card className="text-black">
      <CardHeader>
        <CardTitle>Your monthly spending</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="spent" fill="var(--color-desktop)" radius={8}>
            
          </Bar>
        </BarChart>
      </ChartContainer>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
  
}