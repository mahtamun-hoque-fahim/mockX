"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Save, LogOut, AlertTriangle, Check, Loader2 } from "lucide-react";

interface Props {
  user: { id: string; name: string; email: string };
}

export function AccountSettings({ user }: Props) {
  const router = useRouter();
  const [name, setName]               = useState(user.name);
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [profileState, setProfileState] = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [pwState, setPwState]           = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [pwError, setPwError]           = useState("");

  const handleProfileSave = async () => {
    setProfileState("saving");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error();
      setProfileState("saved");
      setTimeout(() => setProfileState("idle"), 2500);
    } catch {
      setProfileState("error");
      setTimeout(() => setProfileState("idle"), 2500);
    }
  };

  const handlePasswordChange = async () => {
    setPwError("");
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwState("saving");
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (!res.ok) { setPwError("Current password is incorrect."); setPwState("idle"); return; }
      setPwState("saved");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwState("idle"), 2500);
    } catch {
      setPwError("Something went wrong.");
      setPwState("idle");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6 space-y-4">
        <h2 className="font-syne font-semibold text-base text-text-primary">Profile</h2>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <div>
          <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1.5 font-medium">Email</div>
          <div className="px-3.5 py-2.5 bg-surface-elevated border border-white/7 rounded-xl text-sm text-text-secondary">{user.email}</div>
          <p className="text-[10px] text-text-secondary mt-1 pl-1">Email cannot be changed.</p>
        </div>
        <Button
          onClick={handleProfileSave}
          disabled={profileState === "saving"}
          className="gap-2 text-sm"
        >
          {profileState === "saving" && <Loader2 size={13} className="animate-spin"/>}
          {profileState === "saved"  && <Check size={13}/>}
          {profileState === "idle"   && <Save size={13}/>}
          {profileState === "saving" ? "Saving…" : profileState === "saved" ? "Saved!" : "Save changes"}
        </Button>
      </div>

      {/* Password */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6 space-y-4">
        <h2 className="font-syne font-semibold text-base text-text-primary">Password</h2>
        <Input label="Current password" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" />
        <Input label="New password" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 8 characters" />
        <Input label="Confirm new password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" error={pwError} />
        <Button
          onClick={handlePasswordChange}
          disabled={pwState === "saving" || !currentPw || !newPw || !confirmPw}
          className="gap-2 text-sm"
        >
          {pwState === "saving" && <Loader2 size={13} className="animate-spin"/>}
          {pwState === "saved"  && <Check size={13}/>}
          {pwState === "idle"   && <Save size={13}/>}
          {pwState === "saving" ? "Updating…" : pwState === "saved" ? "Updated!" : "Update password"}
        </Button>
      </div>

      {/* Session */}
      <div className="bg-surface border border-white/7 rounded-2xl p-6">
        <h2 className="font-syne font-semibold text-base text-text-primary mb-4">Session</h2>
        <Button variant="secondary" onClick={handleSignOut} className="gap-2 text-sm">
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
