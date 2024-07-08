"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import useParams from "@/lib/hooks/params.hook";
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
  const {
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
  } = useParams();
  return (
    <div className="flex flex-wrap items-center gap-3">
      {rangeOptions.map((option) => (
        <Tab
          key={option.value}
          option={option}
          selected={!getQueryParam("range")
            ? option.value === "all"
            : getQueryParam("range") === option.value}
          onClick={() => {
            if (option.value === "all") {
              deleteQueryParam("range");
            } else {
              setQueryParam({
                name: "range",
                value: option.value,
              });
            }
          }}
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
      className={cn("relative duration-500")}
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
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
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
