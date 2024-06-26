import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavMenu from "./nav-menu";

export default function MobileAsideSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>
            Fincances app
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <NavMenu />
      </SheetContent>
    </Sheet>
  );
}
