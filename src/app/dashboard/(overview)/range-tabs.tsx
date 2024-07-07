"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type RangeOption = {
  label: string;
  value: string;
};

const rangeOptions: RangeOption[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Day",
    value: "day",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
];

export default function RangeTabs() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {rangeOptions.map((option) => (
        <Tab
          key={option.value}
          option={option}
          selected={false}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}

const Tab = ({
  option,
  selected,
  onClick,
}: {
  option: RangeOption;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      className={cn("relative")}
      variant={selected ? "default" : "secondary"}
      size={"sm"}
      onClick={onClick}
    >
      <span className="relative z-10">
        {option.label}
      </span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className={buttonVariants({
            className: "absolute inset-0 z-0",
            size: "sm",
          })}
        >
        </motion.span>
      )}
    </Button>
  );
};
