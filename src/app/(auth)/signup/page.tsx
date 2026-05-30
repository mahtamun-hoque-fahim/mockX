"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");
    try {
      await signUp.email({ name, email, password, callbackURL: "/app/dashboard" });
      router.push("/app/dashboard");
    } catch {
      setError("Account creation failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Create your account</h1>
        <p className="text-sm text-text-secondary">Free forever · No credit card needed</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required autoFocus />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required error={error} />
        <Button type="submit" className="w-full gap-2" disabled={loading}>
          <UserPlus size={14}/>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:text-accent-hover transition-colors">Sign in</Link>
      </p>
    </div>
  );
}
