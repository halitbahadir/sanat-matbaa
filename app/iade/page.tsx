import Link from "next/link";

export const metadata = {
  title: "İade Başlat | SM Sanat Matbaası",
};

export default function IadePage() {
  return (
    <main className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">İade Başlat</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700">
          İade süreci sayfası yakında aktif olacaktır. Şimdilik destek için bizimle iletişime geçin.
        </p>
        <div className="mt-4">
          <Link href="/iletisim" className="text-primary-600 hover:text-primary-700 font-semibold">
            İletişim sayfasına git →
          </Link>
        </div>
      </div>
    </main>
  );
}


