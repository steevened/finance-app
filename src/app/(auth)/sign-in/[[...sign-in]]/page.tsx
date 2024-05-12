import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <SignIn path="/sign-in" />;
    </main>
  );
}
