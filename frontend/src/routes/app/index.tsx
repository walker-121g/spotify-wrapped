import { RecentPosts } from "@/components/pages/feed/recent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/stores/auth.store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: DashboardHomePage,
  beforeLoad: async () => {
    const token = useAuth.getState().token;
    if (token) {
      return true;
    }

    try {
      await useAuth.getState().refresh();
      if (useAuth.getState().isAuthed) {
        return true;
      }
    } catch {
      useAuth.getState().logout();
    }
  },
});

function DashboardHomePage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="recent" className="w-full">
            Recent Posts
          </TabsTrigger>
          <TabsTrigger value="following" className="w-full">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <RecentPosts />
        </TabsContent>
        <TabsContent value="following"></TabsContent>
      </Tabs>
    </div>
  );
}
