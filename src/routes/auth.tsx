import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | المزارع الذكي" },
      {
        name: "description",
        content: "سجّل الدخول لحفظ سجل ماشيتك ونباتاتك المفضلة بشكل آمن ومتزامن.",
      },
      { property: "og:title", content: "تسجيل الدخول — المزارع الذكي" },
      { property: "og:description", content: "حساب واحد لحفظ سجل الماشية والمفضلة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const ar = lang === "ar";
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/livestock" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/livestock" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMsg(ar ? "تم إنشاء الحساب، يمكنك الدخول الآن." : "Account created, you can sign in now.");
        setMode("in");
      }
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMsg(ar ? "تعذّر الدخول بجوجل." : "Google sign-in failed.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/livestock" });
  };

  return (
    <main className="px-4 pt-8">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
      >
        <ChevronRight className="size-4" />
        {ar ? "الرئيسية" : "Home"}
      </Link>

      <h1 className="font-display text-2xl font-extrabold text-foreground">
        {mode === "in"
          ? ar
            ? "تسجيل الدخول"
            : "Sign in"
          : ar
            ? "إنشاء حساب"
            : "Create account"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {ar
          ? "حسابك يحفظ سجل الماشية في قاعدة بيانات آمنة."
          : "Your account stores livestock records in a secure database."}
      </p>

      <form onSubmit={submit} className="mt-5 space-y-3 rounded-[20px] border border-gold/30 bg-card p-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ar ? "البريد الإلكتروني" : "Email"}
          className="w-full rounded-xl border border-gold/30 bg-background px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={ar ? "كلمة المرور" : "Password"}
          className="w-full rounded-xl border border-gold/30 bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy && <Loader2 className="size-4 animate-spin" />}
          {mode === "in" ? (ar ? "دخول" : "Sign in") : ar ? "إنشاء الحساب" : "Sign up"}
        </button>
        <button
          type="button"
          onClick={google}
          disabled={busy}
          className="w-full rounded-xl border border-gold/40 bg-background px-4 py-2.5 text-sm font-bold text-foreground disabled:opacity-60"
        >
          {ar ? "الدخول بحساب جوجل" : "Continue with Google"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="w-full text-xs font-semibold text-primary"
        >
          {mode === "in"
            ? ar
              ? "ليس لديك حساب؟ أنشئ حساباً"
              : "No account? Create one"
            : ar
              ? "لدي حساب بالفعل"
              : "I already have an account"}
        </button>
        {msg && <p className="text-center text-xs font-semibold text-muted-foreground">{msg}</p>}
      </form>
    </main>
  );
}
