"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from "@/lib/actions/account.actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const initialState = {
  message: "",
  ok: false,
};

export default function AddAccountModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, action] = useFormState(createAccount, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state?.message);
    }
    if (state.ok) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new account</DialogTitle>
          <DialogDescription>
            Press the button below to continue.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="grid gap-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="account-name">Account name</Label>
            <Input id="account-name" name="account-name" />
          </div>
          <SubmitFooter />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitFooter() {
  const status = useFormStatus();
  return (
    <DialogFooter>
      <Button
        disabled={status.pending}
        isLoading={status.pending}
        loadingText="Loading..."
        type="submit"
      >
        Submit
      </Button>
      <DialogClose asChild>
        <Button disabled={status.pending} type="button" variant="outline">
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
  );
}
