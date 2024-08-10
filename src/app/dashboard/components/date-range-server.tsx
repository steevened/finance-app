import { getMyIncomes } from "@/lib/actions/incomes.actions";
import { DateRangePicker } from "../components/date-range-picker";
import { getMyDefaultAccount } from "@/lib/actions/account.actions";

export default async function DateRangeServer({}) {
  const account = await getMyDefaultAccount();
  return <DateRangePicker initialFrom={account?.createdAt?.toString()} />;
}
