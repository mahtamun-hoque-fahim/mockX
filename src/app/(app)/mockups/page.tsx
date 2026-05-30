import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = { title: "Saved Mockups — mockX" };

export default function MockupsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Saved Mockups</h1>
          <p className="text-text-secondary text-sm">All your saved mockups in one place</p>
        </div>
        <Link href="/app/screen">
          <Button size="sm" className="gap-1.5">
            <Plus size={13}/> New mockup
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/7 bg-surface p-12 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-white/8 flex items-center justify-center">
          <Plus size={24} className="text-text-secondary"/>
        </div>
        <div>
          <p className="text-text-primary font-medium mb-1">No saved mockups</p>
          <p className="text-sm text-text-secondary max-w-sm">Create a mockup and click Save to store it here. You can re-edit it any time.</p>
        </div>
        <Link href="/app/screen">
          <Button size="sm" className="gap-1.5"><Plus size={13}/>Create your first mockup</Button>
        </Link>
      </div>
    </div>
  );
}
