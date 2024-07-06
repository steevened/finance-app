'use client'

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthAlert({
    open
}: {
    open: boolean
}) {
    return (
        <AlertDialog
            open={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Your session has expired. Please log in to continue
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be redirected to the sign-in page when pressing the button below.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        asChild
                    >
                        <Button asChild>
                            <Link href="/login">
                                Log in
                            </Link>
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}