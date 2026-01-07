import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Ayarlar - Admin Panel",
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();

  if (!user || (user as any).role !== "admin") {
    redirect("/giris?error=unauthorized");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ayarlar</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Ayarlar sayfası yakında eklenecek…</p>
      </div>
    </div>
  );
}


