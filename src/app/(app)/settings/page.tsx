import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AccountSettings } from "@/components/settings/account-settings";

export const metadata = { title: "Settings — mockX" };

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Settings</h1>
        <p className="text-text-secondary text-sm">Manage your account</p>
      </div>
      <AccountSettings user={{ id: session.user.id, name: session.user.name ?? "", email: session.user.email }} />
    </div>
  );
}
