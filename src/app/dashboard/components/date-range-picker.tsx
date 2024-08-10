"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useParams from "@/lib/hooks/params.hook";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { parseAsString, useQueryStates } from "nuqs";
import * as React from "react";
import { DateRange } from "react-day-picker";

const formatShape = "LLL dd, y";
const queryFormatShape = "MM/dd/yyyy";

export function DateRangePicker({
  className,
  from: fromDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  from?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();

  const { getQueryParam, setQueryParam, setQueryParams } = useParams();

  const from = getQueryParam("from");
  const to = getQueryParam("to");

  //   const [dateQuery, setDateQuery] = useQueryStates({
  //     from: parseAsString
  //       .withDefault(format(new Date(fromDate ? fromDate : ""), queryFormatShape))
  //       .withOptions({
  //         startTransition,
  //         shallow: false,
  //       }),
  //     to: parseAsString
  //       .withDefault(format(new Date(), queryFormatShape))
  //       .withOptions({
  //         startTransition,
  //         shallow: false,
  //       }),
  //   });
  //   const { from, to } = dateQuery;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(from || ""),
    to: new Date(to || ""),
  });

  const readableDate = React.useMemo((): string => {
    if (!date || !from || !to) return "Today";

    const toDayString = format(new Date(), formatShape);
    const fromDateString = format(new Date(from), formatShape);
    const toDateString = format(new Date(to), formatShape);

    const isSameDay = fromDateString === toDateString;

    const sameDayString = isSameDay
      ? format(new Date(fromDateString), formatShape)
      : undefined;

    if (sameDayString == toDayString) return "Today";

    return `${fromDateString} - ${toDateString}`;
  }, [from, date, to]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"ghost"}
            className={cn(
              "w-min justify-end text-right font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isLoading ? <Skeleton className="h-9 w-40" /> : readableDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                fromDate ? date < new Date(fromDate) : false
              }
              numberOfMonths={2}
            />
            <Separator />
            <div className="flex items-center justify-between p-3">
              <span className="text-muted-foreground text-sm">
                {date?.from ? format(date.from, formatShape) : ""}{" "}
                {date?.to ? `- ${format(date.to, formatShape)}` : ""}
              </span>
              <div className="flex gap-1.5">
                <Button onClick={() => setOpen(false)} variant={"outline"}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!date?.from) return;
                    if (!date.to) {
                      setOpen(false);
                      setQueryParams({
                        params: [
                          {
                            name: "from",
                            value: format(date.from, queryFormatShape),
                          },
                          {
                            name: "to",
                            value: format(date.from, queryFormatShape),
                          },
                        ],
                      });
                      //   return setDateQuery({
                      //     from: format(date.from, queryFormatShape),
                      //     to: format(date.from, queryFormatShape),
                      //   });
                    }

                    setQueryParams({
                      params: [
                        {
                          name: "from",
                          value: format(date.from, queryFormatShape),
                        },
                        {
                          name: "to",
                          value: format(date.to, queryFormatShape),
                        },
                      ],
                    });

                    // setDateQuery({
                    //   from: format(date.from, queryFormatShape),
                    //   to: format(date.to, queryFormatShape),
                    // });
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
