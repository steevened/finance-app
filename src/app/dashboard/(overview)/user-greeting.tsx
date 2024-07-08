import { getMyUser } from "@/lib/services/user.services";

export default async function UserGreeting() {
  const user = await getMyUser();
  return <h2>Hi, {user.username}</h2>;
}
