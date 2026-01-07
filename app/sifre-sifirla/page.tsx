import Link from "next/link";

export const metadata = {
  title: "Şifre Sıfırla | SM Sanat Matbaası",
};

export default function SifreSifirlaPage() {
  return (
    <main className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Şifre Sıfırla</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700">
          Şifre sıfırlama ekranı yakında aktif olacaktır. Şimdilik admin şifresini Supabase üzerinden
          resetleyebilirsiniz.
        </p>
        <div className="mt-4">
          <Link href="/giris" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Giriş sayfasına dön
          </Link>
        </div>
      </div>
    </main>
  );
}


