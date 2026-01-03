import { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Gerçek uygulamada ürün bilgisi API'den gelecek
  return {
    title: "Ürün Detayı - SM Sanat Matbaası",
    description: "Ürün detayları ve özellikleri",
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail productId={params.id} />;
}

