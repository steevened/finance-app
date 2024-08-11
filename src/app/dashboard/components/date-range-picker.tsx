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
import * as React from "react";
import { DateRange } from "react-day-picker";

const formatShape = "LLL dd, y";
const queryFormatShape = "MM/dd/yyyy";

function formatDate(date?: string | null): string {
  if (!date) return format(new Date(), formatShape);
  return format(date, formatShape);
}

export function DateRangePicker({
  className,
  initialFrom,
}: React.HTMLAttributes<HTMLDivElement> & {
  initialFrom?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();

  const { getQueryParam, setQueryParams } = useParams();

  const from = getQueryParam("from");
  const to = getQueryParam("to");

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(formatDate(initialFrom || from)),
    to: new Date(formatDate(to)),
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

    return `${fromDateString} - ${toDateString}` || "Invalid time value";
  }, [from, date, to]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            isLoading={isLoading}
            loadingText="Loading..."
            disabled={isLoading}
            id="date"
            variant={"outline"}
            className={cn(
              "w-min justify-end text-right font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isLoading ? <Skeleton className="h-9 w-40" /> : readableDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                initialFrom ? date < new Date(initialFrom) : false
              }
              numberOfMonths={2}
            />
            <Separator />
            <div className="flex items-center justify-between p-3">
              <span className="text-muted-foreground text-sm">
                {/* {date?.from ? format(date.from, formatShape) : ""}{" "}
                {date?.to ? `- ${format(date.to, formatShape)}` : ""} */}
                {date?.from
                  ? formatDate(date.from.toString()) +
                    (date?.to ? ` - ${formatDate(date.to.toString())}` : "")
                  : `${readableDate}`}
              </span>
              <div className="flex gap-1.5">
                <Button
                  disabled={isLoading}
                  onClick={() => setOpen(false)}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  loadingText="Applying..."
                  disabled={isLoading}
                  onClick={() => {
                    startTransition(() => {
                      if (!date?.from) return;
                      if (!date.to) {
                        setOpen(false);
                        return setQueryParams({
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

                      setOpen(false);
                    });
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
