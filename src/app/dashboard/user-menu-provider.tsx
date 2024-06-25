import { getMyUser } from "@/lib/services/user.services";
import UserMenu from "./user-menu";

export default async function UserMenuProvider({
    size = 'sm'
}: {
    size?: 'sm' | 'lg'
}) {
    const user = await getMyUser();
    return (
        <UserMenu user={user} size={size} />
    )
}