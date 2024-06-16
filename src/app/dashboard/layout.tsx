import { validateRequest } from "@/lib/db";
import AuthAlert from "./auth-alert";
import Header from "./header";

export default async function Layout(
  { children }: { children: React.ReactNode },
) {
  const { user } = await validateRequest();
  return (
    <div>
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <AuthAlert open={!user} />
      {children}
    </div>
  );
}
