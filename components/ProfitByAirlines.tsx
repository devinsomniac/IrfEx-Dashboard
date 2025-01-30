"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AirlinesNumber = {
  airlines: string;
  number: number;
};

const chartConfig = {
  number: {
    label: "Number of Tickets",
    color: "red",
  },
} satisfies ChartConfig;

export function ProfitByAirlines({
  chartData,
}: {
  chartData: AirlinesNumber[];
}) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Radar Chart - Airlines</CardTitle>
        <CardDescription>
          Showing total tickets for all airlines
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="airlines" /> {/* Updated to match data */}
            <PolarGrid />
            <Radar
              dataKey="number" /* Updated to match data */
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
