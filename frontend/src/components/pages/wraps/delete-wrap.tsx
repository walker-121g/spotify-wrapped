import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Wrap } from "@/services/types/wrap";
import { deleteWrap } from "@/services/wrap.service";

import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Delete, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DeleteWrap = ({
  wrap,
  DeleteButton,
}: {
  wrap: Wrap;
  DeleteButton?: JSX.Element;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isPending, isSuccess, error, mutate } = useMutation({
    mutationKey: ["delete-wrap", wrap.id],
    mutationFn: async () => await deleteWrap(wrap.id),
  });

  useMemo(() => {
    if (error) {
      toast.error(error.message);
    } else if (isSuccess) {
      toast.success("Wrap deleted successfully");
      setOpen(false);
    }
  }, [error, isSuccess]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        {DeleteButton ? (
          DeleteButton
        ) : (
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
          >
            <Delete />
            Delete
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {wrap.name}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this wrap? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="ghost">
            Cancel
          </Button>
          <Button onClick={() => mutate} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
