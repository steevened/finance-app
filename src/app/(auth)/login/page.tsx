import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Page() {
  return (
    <div className="text-center flex items-center justify-center h-screen">
      <div className="flex flex-col gap-5 justify-center">
        <h2>Welcome!</h2>
        <Button asChild className="rounded-3xl" size={"lg"}>
          <a href="api/auth/login/github">
            <GitHubLogoIcon className="w-6 h-6 mr-2" />
            Sign in with GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
