"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorMessage = searchParams?.get("error");
  if (errorMessage === "unauthorized" && !error) {
    setError("Bu sayfaya erişim yetkiniz yok");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) {
        setError("E-posta veya şifre hatalı");
        setLoading(false);
      } else {
        // Profile sync (best-effort)
        fetch("/api/profile", { method: "POST" }).catch(() => {});

        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) {
        setError(error.message || "Kayıt başarısız");
        setLoading(false);
      } else {
        // If email confirmation is enabled, session can be null
        if (!data.session) {
          setError(
            "Kayıt başarılı. E-posta doğrulaması gerekiyorsa mailini kontrol et, sonra giriş yap."
          );
          setLoading(false);
          return;
        }

        // Profile sync
        fetch("/api/profile", { method: "POST" }).catch(() => {});

        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Kayıt sırasında bir hata oluştu");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-50 to-brown-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-brown-800 p-3 rounded mb-4">
            <span className="text-gold-500 font-bold text-2xl">SM</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Hesabınıza giriş yapın"
              : "Yeni hesap oluşturun"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şifre Tekrar
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Beni hatırla</span>
              </label>
              <Link
                href="/sifre-sifirla"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Şifremi unuttum
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Yükleniyor..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
            }}
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            {isLogin
              ? "Hesabınız yok mu? Kayıt olun"
              : "Zaten hesabınız var mı? Giriş yapın"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block bg-brown-800 p-3 rounded mb-4">
            <span className="text-gold-500 font-bold text-2xl">SM</span>
          </div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
