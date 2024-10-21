import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SafeError from "@/lib/safe-error";
import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";

const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  console.error(error);

  return (
    <div className="grid grid-cols-1 p-6 pt-64 w-full items-center justify-items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>An Error Occurred</CardTitle>
          <CardDescription>
            {error instanceof SafeError
              ? error.message
              : new SafeError().message}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col items-center justify-center pt-2 gap-2">
          <Button onClick={() => router.invalidate()} className="w-full">
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="w-full"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go back</span>
          </Button>
          <Button variant="link" asChild>
            <Link to="/" className="-mt-1">
              <span>Return home</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DefaultCatchBoundary;
