import { client } from "@/lib/client";
import { getMyUser } from "@/lib/services/user.services";
import BalanceCard from "./balance-card";
import RangeTabs from "./range-tabs";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const getAccounts = async () => {
  const res = await client.api.accounts.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return res.json();
};

export default async function Home() {
  const { data } = await getAccounts();
  const profile = await getMyUser();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2>Good night, {profile.username}</h2>
        <div className="text-end">
          <small>
            Today
          </small>
          <h2>{formatCurrency(0)}</h2>
        </div>
      </div>
      <Separator />

      <RangeTabs />
    </div>
  );
}
