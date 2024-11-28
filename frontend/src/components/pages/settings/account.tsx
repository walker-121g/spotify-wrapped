import { useAuth } from "@/stores/auth.store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const AccountSettings = () => {
  const auth = useAuth();

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences access.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your account? This action is
                  irreversible.
                </DialogDescription>
                <DialogClose />
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={() => auth.delete()}>
                  Yes, Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
