import { Wrap } from "@/services/types/wrap";

import { Card, CardHeader } from "@/components/ui/card";
import { Follow } from "../../feed/follow";

export const WrapUsers = ({ wrap }: { wrap: Wrap }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-text text-md font-semibold">Users</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wrap.users.map((user) => (
          <Card key={user.email}>
            <CardHeader>
              <Follow
                user={{
                  ...user,
                  id: 0,
                }}
                description={user.owner ? "Creator" : "Shared With"}
              />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
