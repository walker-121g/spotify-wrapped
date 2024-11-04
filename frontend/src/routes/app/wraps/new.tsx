import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { wrapSchema, WrapSchema } from "@/schemas/wrap.schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import VectorImage from "@/assets/undraw_friends.svg";
import { Loader2, Trash } from "lucide-react";

export const Route = createFileRoute("/app/wraps/new")({
  component: NewWrapPage,
});

function NewWrapPage() {
  const [users, setUsers] = useState<string[]>([]);
  const form = useForm<WrapSchema>({
    resolver: zodResolver(wrapSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      period: "short_term",
      _user: undefined,
    },
  });

  const { isPending, mutate, error } = useMutation({
    mutationKey: ["wraps", "new"],
    mutationFn: async (data: WrapSchema) => {
      console.log(data);
    },
  });

  useMemo(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Form {...form}>
      <form
        onSubmit={() => {
          mutate(form.getValues());
        }}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>New Wrap</CardTitle>
            <CardDescription>
              Create a new wrap to view and share with others!
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Wrap Name</FormLabel>
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
              name="period"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Time Period</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short_term">Short Term</SelectItem>
                        <SelectItem value="medium_term">Medium Term</SelectItem>
                        <SelectItem value="long_term">Long Term</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Add Friends</CardTitle>
            <CardDescription>
              You can add up to 4 friends to combine your wraps together!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between">
            {users.length > 0 ? (
              <div className="flex flex-col gap-2 my-4">
                {users.map((user: string) => (
                  <div
                    key={user}
                    className="flex flex-row justify-between items-center"
                  >
                    <span className="text-sm font-semibold">{user}</span>
                    <Button
                      type="button"
                      onClick={() => {
                        setUsers((users) => users.filter((u) => u !== user));
                      }}
                      size="icon"
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 my-4 mx-auto">
                <img
                  src={VectorImage}
                  alt="Friends"
                  className="w-1/2 mx-auto"
                />
                <p className="text-xs text-center text-gray-500">
                  You haven't added any friends yet!
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="_user"
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="justify-self-end">
                    <FormLabel>Friend Email</FormLabel>
                    <FormControl>
                      <div className="w-full flex flex-row gap-2 items-center">
                        <Input {...field} className="w-full" />
                        <Button
                          type="button"
                          disabled={
                            !field.value ||
                            fieldState.invalid ||
                            users.length > 4
                          }
                          onClick={() => {
                            if (field.value) {
                              setUsers([...users, field.value]);
                              form.setValue("_user", undefined);
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 min-h-96">
          <CardHeader>
            <CardTitle>Loaded Data</CardTitle>
            <CardDescription>
              Here's a preview of what we found!
            </CardDescription>
          </CardHeader>
          <CardContent className=""></CardContent>
        </Card>
        <div className="md:col-span-3 flex flex-row justify-end">
          <Button type="submit" disabled={isPending || !form.formState.isValid}>
            {isPending ? <Loader2 /> : <></>}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
