import { AccountSettings } from "@/components/pages/settings/account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <AccountSettings />
    </div>
  );
}
