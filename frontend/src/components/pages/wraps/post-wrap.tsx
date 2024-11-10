import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Wrap } from "@/services/types/wrap";
import { postSchema, PostSchema } from "@/schemas/post.schema";
import { post } from "@/services/social.service";

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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Loader2 } from "lucide-react";

export const PostWrap = ({ wrap }: { wrap: Wrap }) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { isPending, isSuccess, error, mutate } = useMutation({
    mutationKey: ["post-wrap", wrap.id],
    mutationFn: async (input: PostSchema) =>
      await post({
        title: input.title,
        content: input.content,
        wrap_id: wrap.id,
      }),
  });

  useMemo(() => {
    if (error) {
      toast.error(error.message);
    } else if (isSuccess) {
      form.reset();
      toast.success("Wrap posted successfully");
      setOpen(false);
    }
  }, [error, isSuccess]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          <ExternalLink />
          Post
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mutate(form.getValues());
            }}
          >
            <DialogHeader>
              <DialogTitle>Post {wrap.name}</DialogTitle>
              <DialogDescription>
                This wrap will be viewable by everyone.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <div className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <DialogFooter className="mt-4 gap-2">
              <Button
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending && <Loader2 className="animate-spin" />}
                Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
