import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="m-auto items-center justify-items-center">
      <Card className="m-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>
            The page you are looking for does not exist. If you believe this is
            an error on our end, please contact support.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col items-center justify-center pt-2">
          <Button onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Go back</span>
          </Button>
          <Button variant="link" asChild>
            <Link to="/">
              <span>Return home</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
