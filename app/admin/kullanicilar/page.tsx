import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Kullanıcılar - Admin Panel",
};

export const dynamic = "force-dynamic";

async function getUsers() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("User")
      .select("id, name, email, role, createdAt")
      .order("createdAt", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser();

  if (!user || (user as any).role !== "admin") {
    redirect("/giris?error=unauthorized");
  }

  const users = await getUsers();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Kullanıcılar</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Henüz kullanıcı bulunmuyor
                </td>
              </tr>
            ) : (
              users.map((u: any) => (
                <tr key={u.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {u.name || "—"}
                    </div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("tr-TR") : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


