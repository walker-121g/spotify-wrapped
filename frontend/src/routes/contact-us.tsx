import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { toast } from "sonner";

import { ContactSchema, contactSchema } from "@/schemas/contact.schema";
import { createFeedback } from "@/services/feedback.service";

import { Header } from "@/components/router/header";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import VectorImage from "@/assets/undraw_friends.svg";

export const Route = createFileRoute("/contact-us")({
  component: () => <ContactUsPage />,
});

function ContactUsPage() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const { isPending, isSuccess, error, mutate } = useMutation({
    mutationKey: ["contact", "us"],
    mutationFn: async (data: ContactSchema) => await createFeedback(data),
  });

  useMemo(() => {
    if (isSuccess) {
      toast.success("Your feedback has been recorded!");
    } else if (error) {
      toast.error(error.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="w-screen h-screen flex flex-col items-center justify-center p-16">
        {isSuccess ? (
          <div className="w-full flex flex-col gap-4 justify-center my-24">
            <img src={VectorImage} alt="Success" className="w-1/2 mx-auto" />
            <p className="text-sm text-center">
              Your feedback has been recorded!
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                mutate(form.getValues());
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Contact Us</h1>
                <span className="text-sm text-muted-foreground">
                  Send your feedback and any issues you may encounter to the
                  developers.
                </span>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your issue and/or feedback"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="w-full flex flex-row justify-end">
                <Button
                  type="submit"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending && <Loader2 className="animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        )}
      </main>
    </div>
  );
}
