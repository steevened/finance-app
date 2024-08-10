import { format } from "date-fns";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { TransitionStartFunction } from "react";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const dateShape = "MM/dd/yyyy";

// export const dateParsers = {
//   from: parseAsString,
//   // .withDefault(format(new Date(fromDate ? fromDate : ""), queryFormatShape))
//   // .withOptions({
//   //   startTransition,
//   // }),
//   to: parseAsString,
//   // .withDefault(format(new Date(), queryFormatShape))
//   // .withOptions({
//   //   startTransition,
//   // }),
// };

export const getDateParsers = ({
  initialFrom,
  startTransition,
}: {
  initialFrom?: string;
  startTransition?: TransitionStartFunction;
}) => {
  return {
    from: parseAsString
      //   .withDefault(format(new Date(initialFrom ? initialFrom : ""), dateShape))
      .withOptions({
        startTransition,
        shallow: false,
      }),
    to: parseAsString
      // .withDefault(format(new Date(), dateShape))
      .withOptions({
        startTransition,
        shallow: false,
      }),
  };
};

const dateParsers = getDateParsers({});

export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  from: parseAsString,
  to: parseAsString,
});

export const dateParamsCache = createSearchParamsCache(dateParsers);
