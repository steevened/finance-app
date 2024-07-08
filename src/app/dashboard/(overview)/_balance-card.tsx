"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparkAreaChart } from "../components/spark-chart";

const chartdata = [
  {
    month: "Jan 23",
    Performance: 4000,
    Benchmark: 3000,
  },
  {
    month: "Feb 23",
    Performance: 3000,
    Benchmark: 2000,
  },
  {
    month: "Mar 23",
    Performance: 2000,
    Benchmark: 1700,
  },
  {
    month: "Apr 23",
    Performance: 2780,
    Benchmark: 2500,
  },
  {
    month: "May 23",
    Performance: 1890,
    Benchmark: 1890,
  },
  {
    month: "Jun 23",
    Performance: 2390,
    Benchmark: 2000,
  },
  {
    month: "Jul 23",
    Performance: 3490,
    Benchmark: 3000,
  },
];

export default function BalanceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Total balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p>$185.00</p>
          <SparkAreaChart
            data={chartdata}
            index="date"
            categories={["Performance", "Benchmark"]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
