import Link from "next/link";

export const metadata = {
  title: "Arama | SM Sanat Matbaası",
};

export default function AramaPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q || "").trim();

  return (
    <main className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Arama</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700 mb-2">
          Arama özelliği yakında geliştirilecektir.
        </p>
        {q ? (
          <p className="text-gray-600 text-sm">
            Aranan: <span className="font-semibold">{q}</span>
          </p>
        ) : (
          <p className="text-gray-600 text-sm">Henüz bir arama terimi girilmedi.</p>
        )}
        <div className="mt-4">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Anasayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
}


