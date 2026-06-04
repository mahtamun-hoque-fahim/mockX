"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-8 text-center">
      <div className="max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={20} className="text-red-400"/>
        </div>
        <h2 className="font-syne font-bold text-xl text-text-primary mb-2">Something went wrong</h2>
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          An error occurred loading this page. Your work is safe.
        </p>
        <Button onClick={reset} className="gap-2">
          <RefreshCw size={14}/> Try again
        </Button>
      </div>
    </div>
  );
}
