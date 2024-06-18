import { client } from "@/lib/client";
import Header from "./header";

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
      {JSON.stringify(data)}
    </div>
  );
}
