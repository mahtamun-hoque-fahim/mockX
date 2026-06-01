"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, LogOut, AlertTriangle, Check, Loader2, Zap, ExternalLink } from "lucide-react";

interface Props {
  user: { id: string; name: string; email: string; role: string };
  hasSub: boolean;
}

export function AccountSettings({ user, hasSub }: Props) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [name, setName]           = useState(user.name);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [profileState, setProfileState] = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [pwState, setPwState]           = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [pwError, setPwError]           = useState("");
  const [upgraded, setUpgraded]         = useState(false);

  useEffect(() => {
    if (searchParams.get("upgraded") === "1") {
      setUpgraded(true);
      router.replace("/app/settings");
    }
  }, [searchParams, router]);

  const isPro = user.role === "pro" || user.role === "admin";

  const handleProfileSave = async () => {
    setProfileState("saving");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      setProfileState("saved"); setTimeout(() => setProfileState("idle"), 2500);
    } catch {
      setProfileState("error"); setTimeout(() => setProfileState("idle"), 2500);
    }
  };

  const handlePasswordChange = async () => {
    setPwError("");
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwState("saving");
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (!res.ok) { setPwError("Current password is incorrect."); setPwState("idle"); return; }
      setPwState("saved");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwState("idle"), 2500);
    } catch {
      setPwError("Something went wrong."); setPwState("idle");
    }
  };

  return (
    <div className="space-y-6">
      {/* Upgrade success banner */}
      {upgraded && (
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex items-center gap-3">
          <Zap size={16} className="text-accent shrink-0"/>
          <div>
            <p className="text-sm font-medium text-text-primary">You&apos;re now on Pro!</p>
            <p className="text-xs text-text-secondary">3× exports, no watermarks, and unlimited saves are all unlocked.</p>
          </div>
        </div>
      )}

      {/* Plan */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6">
        <h2 className="font-syne font-semibold text-base text-text-primary mb-4">Plan</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-text-primary">{isPro ? "Pro" : "Free"}</span>
                <Badge variant={isPro ? "pro" : "default"}>{isPro ? "Pro" : "Free"}</Badge>
              </div>
              <p className="text-xs text-text-secondary">
                {isPro ? "Unlimited saves · 3× export · No watermark" : "20 saves · 2× export · Watermark"}
              </p>
            </div>
          </div>
          {isPro ? (
            <a href="/api/billing/portal">
              <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                <ExternalLink size={12}/> Manage billing
              </Button>
            </a>
          ) : (
            <a href="/api/billing/checkout">
              <Button size="sm" className="gap-1.5 text-xs shadow-lg shadow-accent/20">
                <Zap size={12}/> Upgrade to Pro
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Profile */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6 space-y-4">
        <h2 className="font-syne font-semibold text-base text-text-primary">Profile</h2>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"/>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 font-medium">Email</div>
          <div className="px-3.5 py-2.5 bg-surface-elevated border border-white/7 rounded-xl text-sm text-text-secondary">{user.email}</div>
          <p className="text-[10px] text-text-secondary mt-1 pl-1">Email cannot be changed.</p>
        </div>
        <Button onClick={handleProfileSave} disabled={profileState === "saving"} className="gap-2 text-sm">
          {profileState === "saving" ? <Loader2 size={13} className="animate-spin"/> : profileState === "saved" ? <Check size={13}/> : <Save size={13}/>}
          {profileState === "saving" ? "Saving…" : profileState === "saved" ? "Saved!" : "Save changes"}
        </Button>
      </div>

      {/* Password */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6 space-y-4">
        <h2 className="font-syne font-semibold text-base text-text-primary">Password</h2>
        <Input label="Current password" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••"/>
        <Input label="New password"     type="password" value={newPw}     onChange={e => setNewPw(e.target.value)}     placeholder="Min. 8 characters"/>
        <Input label="Confirm password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" error={pwError}/>
        <Button onClick={handlePasswordChange} disabled={pwState === "saving" || !currentPw || !newPw || !confirmPw} className="gap-2 text-sm">
          {pwState === "saving" ? <Loader2 size={13} className="animate-spin"/> : pwState === "saved" ? <Check size={13}/> : <Save size={13}/>}
          {pwState === "saving" ? "Updating…" : pwState === "saved" ? "Updated!" : "Update password"}
        </Button>
      </div>

      {/* Session */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6">
        <h2 className="font-syne font-semibold text-base text-text-primary mb-4">Session</h2>
        <Button variant="secondary" onClick={async () => { await signOut(); router.push("/"); }} className="gap-2 text-sm">
          <LogOut size={13}/> Sign out
        </Button>
      </div>

      {/* Danger zone */}
      <div className="bg-surface border border-red-500/15 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={14} className="text-red-400"/>
          <h2 className="font-syne font-semibold text-base text-red-400">Danger zone</h2>
        </div>
        <p className="text-sm text-text-secondary mb-4">Permanently delete your account and all saved mockups. This cannot be undone.</p>
        <Button variant="danger" className="text-sm gap-2">
          <AlertTriangle size={13}/> Delete account
        </Button>
      </div>
    </div>
  );
}
