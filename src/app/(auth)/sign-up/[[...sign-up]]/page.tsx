import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <ClerkLoaded>
        <SignUp path="/sign-up" />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="text-muted-foreground animate-spin w-20 h-20" />
      </ClerkLoading>
    </main>
  );
}
