import { Truck, RotateCcw, Headphones, CreditCard } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Dünya Çapında Kargo",
      description: "₺65 üzeri ücretsiz kargo",
    },
    {
      icon: RotateCcw,
      title: "İade",
      description: "30 gün içinde değişim",
    },
    {
      icon: Headphones,
      title: "Online Destek",
      description: "Birinci sınıf müşteri hizmeti",
    },
    {
      icon: CreditCard,
      title: "Esnek Ödeme",
      description: "Birden fazla kredi kartı ile ödeme",
    },
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 border-b border-gray-200">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mb-3 sm:mb-4">
                <feature.icon size={24} className="sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
