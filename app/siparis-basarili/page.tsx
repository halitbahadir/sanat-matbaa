import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Siparişiniz Alındı!
        </h1>
        <p className="text-gray-600 mb-8">
          Siparişiniz başarıyla oluşturuldu. En kısa sürede size ulaşacağız.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/siparislerim"
            className="block text-primary-600 hover:text-primary-700 mt-4"
          >
            Siparişlerimi Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}

