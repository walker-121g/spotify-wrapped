import { useAuth } from "@/stores/auth.store";
import { createFileRoute } from "@tanstack/react-router";

import { RecentPosts } from "@/components/pages/feed/recent";
import { FollowingPosts } from "@/components/pages/feed/following";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LikedPosts } from "@/components/pages/feed/liked";

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
          <TabsTrigger value="liked" className="w-full">
            Liked
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <RecentPosts />
        </TabsContent>
        <TabsContent value="following">
          <FollowingPosts />
        </TabsContent>
        <TabsContent value="liked">
          <LikedPosts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
