export const metadata = {
  title: "İletişim | SM Sanat Matbaası",
};

export default function IletisimPage() {
  return (
    <main className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-gray-700 mb-2">Bize aşağıdaki kanallardan ulaşabilirsiniz:</p>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>
            <span className="font-semibold">E-posta:</span> info@sanatmatbaasi.com
          </li>
          <li>
            <span className="font-semibold">Telefon:</span> 0532 622 33 67
          </li>
          <li>
            <span className="font-semibold">Konum:</span> İstanbul, Türkiye
          </li>
        </ul>
      </div>
    </main>
  );
}


