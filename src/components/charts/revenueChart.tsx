"use client";

import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { date: "2024-04-01", revenue: 372 },
  { date: "2024-04-02", revenue: 277 },
  { date: "2024-04-03", revenue: 287 },
  { date: "2024-04-04", revenue: 502 },
  { date: "2024-04-05", revenue: 663 },
  { date: "2024-04-06", revenue: 641 },
  { date: "2024-04-07", revenue: 425 },
  { date: "2024-04-08", revenue: 729 },
  { date: "2024-04-09", revenue: 169 },
  { date: "2024-04-10", revenue: 451 },
  { date: "2024-04-11", revenue: 677 },
  { date: "2024-04-12", revenue: 502 },
  { date: "2024-04-13", revenue: 722 },
  { date: "2024-04-14", revenue: 357 },
  { date: "2024-04-15", revenue: 290 },
  //   { date: "2024-04-16", revenue: 328 },
  //   { date: "2024-04-17", revenue: 806 },
  //   { date: "2024-04-18", revenue: 774 },
  //   { date: "2024-04-19", revenue: 423 },
  //   { date: "2024-04-20", revenue: 239 },
  //   { date: "2024-04-21", revenue: 337 },
  //   { date: "2024-04-22", revenue: 394 },
  //   { date: "2024-04-23", revenue: 368 },
  //   { date: "2024-04-24", revenue: 677 },
  //   { date: "2024-04-25", revenue: 465 },
  //   { date: "2024-04-26", revenue: 205 },
  //   { date: "2024-04-27", revenue: 803 },
  //   { date: "2024-04-28", revenue: 302 },
  //   { date: "2024-04-29", revenue: 555 },
  //   { date: "2024-04-30", revenue: 834 },
  //   { date: "2024-05-01", revenue: 385 },
  //   { date: "2024-05-02", revenue: 603 },
  //   { date: "2024-05-03", revenue: 437 },
  //   { date: "2024-05-04", revenue: 805 },
  //   { date: "2024-05-05", revenue: 871 },
  //   { date: "2024-05-06", revenue: 1018 },
  //   { date: "2024-05-07", revenue: 688 },
  //   { date: "2024-05-08", revenue: 359 },
  //   { date: "2024-05-09", revenue: 407 },
  //   { date: "2024-05-10", revenue: 623 },
  //   { date: "2024-05-11", revenue: 605 },
  //   { date: "2024-05-12", revenue: 437 },
  //   { date: "2024-05-13", revenue: 357 },
];

const chartConfig = {
  revenue: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const RevenueChart = () => {
  return (
    <div className="overflow-hidden">
      <ChartContainer config={chartConfig} className=" w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Bar dataKey="revenue" fill="#F0D3D399" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;
