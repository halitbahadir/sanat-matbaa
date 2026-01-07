import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard - SM Sanat Matbaası",
  description: "Admin kontrol paneli",
};

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const supabase = createSupabaseServerClient();

    const [productsResult, ordersResult, usersResult, revenueResult] =
      await Promise.allSettled([
        supabase
          .from("Product")
          .select("id", { count: "exact", head: true })
          .eq("active", true),
        supabase
          .from("Order")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("User")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("Order")
          .select("total")
          .eq("paymentStatus", "paid"),
      ]);

    const products = productsResult.status === "fulfilled" ? productsResult.value : { count: 0 };
    const orders = ordersResult.status === "fulfilled" ? ordersResult.value : { count: 0 };
    const users = usersResult.status === "fulfilled" ? usersResult.value : { count: 0 };
    const revenue = revenueResult.status === "fulfilled" ? revenueResult.value : { data: [] };

    const totalRevenue = revenue.data
      ? revenue.data.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
      : 0;

    return {
      totalProducts: products.count || 0,
      totalOrders: orders.count || 0,
      totalUsers: users.count || 0,
      totalRevenue,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
    };
  }
}

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || (user as any).role !== "admin") {
    redirect("/giris?error=unauthorized");
  }

  const stats = await getStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Toplam Ürün"
          value={stats.totalProducts}
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Toplam Sipariş"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="green"
        />
        <StatsCard
          title="Toplam Kullanıcı"
          value={stats.totalUsers}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Toplam Gelir"
          value={`${stats.totalRevenue.toFixed(2)}₺`}
          icon={DollarSign}
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Son Siparişler
        </h2>
        <p className="text-gray-600">Sipariş listesi yakında eklenecek...</p>
      </div>
    </div>
  );
}
