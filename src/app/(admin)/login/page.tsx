"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Email atau Password salah!");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-xl w-[400px] border border-zinc-100">
        <h2 className="text-3xl font-bold mb-2 text-center text-zinc-900 tracking-tight">Admin Area</h2>
        <p className="text-zinc-500 text-center text-sm mb-8">Lumina Estate Management</p>
        
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center font-medium border border-red-100">{error}</div>}
        
        <div className="mb-5">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">Email Address</label>
          <input className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" type="email" placeholder="admin@lumina.com" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-8">
          <label className="block text-zinc-700 text-sm font-semibold mb-2">Password</label>
          <input className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-zinc-900 text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-70">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
