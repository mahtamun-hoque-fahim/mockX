"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import type { Mockup } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

interface Row { mockup: Mockup; userName: string | null }

export function AdminMockupsClient({ initialRows }: { initialRows: Row[] }) {
  const [rows,     setRows]     = useState<Row[]>(initialRows);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const allIds     = rows.map(r => r.mockup.id);
  const allChecked = allIds.length > 0 && allIds.every(id => selected.has(id));
  const anyChecked = selected.size > 0;

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(allIds));

  const handleBulkDelete = async () => {
    if (!anyChecked) return;
    setDeleting(true);
    const ids = [...selected];
    await Promise.all(ids.map(id => fetch(`/api/admin/mockups/${id}`, { method: "DELETE" })));
    setRows(prev => prev.filter(r => !selected.has(r.mockup.id)));
    setSelected(new Set());
    setDeleting(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Mockups</h1>
          <p className="text-text-secondary text-sm">{rows.length} total mockups</p>
        </div>

        {anyChecked && (
          <Button
            variant="danger"
            size="sm"
            className="gap-2 shrink-0"
            onClick={handleBulkDelete}
            disabled={deleting}
          >
            {deleting
              ? <Loader2 size={13} className="animate-spin" />
              : <Trash2 size={13} />
            }
            Delete selected ({selected.size})
          </Button>
        )}
      </div>

      <div className="bg-surface border border-white/7 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/7">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 rounded accent-accent cursor-pointer"
                  />
                </th>
                {["Title", "User", "Type", "Public", "Created"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-text-secondary">No mockups yet</td></tr>
              ) : (
                rows.map(({ mockup: m, userName }) => (
                  <tr
                    key={m.id}
                    className={`border-b border-white/5 transition-colors cursor-pointer ${selected.has(m.id) ? "bg-accent/6" : "hover:bg-white/2"}`}
                    onClick={() => toggle(m.id)}
                  >
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.has(m.id)}
                        onChange={() => toggle(m.id)}
                        className="w-3.5 h-3.5 rounded accent-accent cursor-pointer"
                      />
                    </td>
                    <td className="px-5 py-3.5 text-text-primary font-medium">
                      {m.title ?? <span className="text-text-secondary italic">Untitled</span>}
                    </td>
                    <td className="px-5 py-3.5 text-text-secondary">{userName ?? "—"}</td>
                    <td className="px-5 py-3.5"><Badge variant="default">{m.type}</Badge></td>
                    <td className="px-5 py-3.5"><Badge variant={m.isPublic ? "success" : "default"}>{m.isPublic ? "Public" : "Private"}</Badge></td>
                    <td className="px-5 py-3.5 text-text-secondary">{formatDate(m.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
