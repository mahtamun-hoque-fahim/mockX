import { db } from "@/lib/db";
import { presets } from "@/lib/db/schema";
import type { Preset } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function getPresets(): Promise<Preset[]> {
  try {
    return await db.select().from(presets).orderBy(presets.sortOrder);
  } catch {
    return [];
  }
}

export default async function AdminPresetsPage() {
  const rows = await getPresets();
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Presets</h1>
          <p className="text-text-secondary text-sm">Manage wallpapers, desk environments, and backgrounds</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus size={13}/> Add preset</Button>
      </div>
      {(["wallpaper","desk","background"] as const).map(category => {
        const categoryRows = rows.filter((r: Preset) => r.category === category);
        return (
          <div key={category} className="mb-8">
            <h2 className="font-syne font-semibold text-base text-text-primary capitalize mb-4">{category}s</h2>
            {categoryRows.length === 0 ? (
              <div className="bg-surface border border-white/7 rounded-2xl p-8 text-center text-text-secondary text-sm">
                No {category} presets. Add some from the button above.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categoryRows.map((p: Preset) => (
                  <div key={p.id} className="bg-surface border border-white/7 rounded-xl overflow-hidden">
                    <div className="h-20" style={{ background: p.value }} />
                    <div className="p-2">
                      <div className="text-xs text-text-primary font-medium truncate">{p.label}</div>
                      <Badge variant={p.isActive ? "success" : "default"} className="mt-1 text-[10px]">
                        {p.isActive ? "Active" : "Hidden"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
