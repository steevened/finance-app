import { client } from "@/lib/client";
import { getMyUser } from "@/lib/services/user.services";
import BalanceCard from "./balance-card";

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
      <h2>Good night, {profile.username}</h2>

      <div className="grid  gap-4 md:grid-cols-3">
        <BalanceCard />
        <BalanceCard />
        <BalanceCard />
      </div>
    </div>
  );
}
