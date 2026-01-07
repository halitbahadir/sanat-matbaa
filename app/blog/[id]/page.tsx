import Link from "next/link";

export const metadata = {
  title: "Blog | SM Sanat Matbaası",
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-6 py-10">
      <div className="mb-6">
        <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold">
          ← Blog&apos;a dön
        </Link>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Blog Yazısı #{id}</h1>
      <p className="text-gray-600">Bu sayfa şimdilik örnek/placeholder içeriktir. (Yakında)</p>
    </main>
  );
}


