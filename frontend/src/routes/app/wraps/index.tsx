import { createFileRoute } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyWraps } from "@/components/pages/wraps/my-wraps";
import { SharedWraps } from "@/components/pages/wraps/shared-wraps";
import { PendingWraps } from "@/components/pages/wraps/pending-wraps";

export const Route = createFileRoute("/app/wraps/")({
  component: WrapsPage,
});

function WrapsPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs defaultValue="my" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="my" className="w-full">
            My Wraps
          </TabsTrigger>
          <TabsTrigger value="shared" className="w-full">
            Shared Wraps
          </TabsTrigger>
          <TabsTrigger value="pending" className="w-full">
            Pending Wraps
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my">
          <MyWraps />
        </TabsContent>
        <TabsContent value="shared">
          <SharedWraps />
        </TabsContent>
        <TabsContent value="pending">
          <PendingWraps />
        </TabsContent>
      </Tabs>
    </div>
  );
}
