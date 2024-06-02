import Header from "@/components/header";
import { client } from "@/lib/client";

const getAccounts = async () => {
  const res = await client.api.accounts.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return res.json();
};

export default async function Home() {
  const { data } = await getAccounts();

  return (
    <div>
      <Header />
      {JSON.stringify(data)}
    </div>
  );
}
