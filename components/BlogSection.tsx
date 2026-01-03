import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Film Müziğini Hikayenize En İyi Şekilde Hizmet Edecek Şekilde Düzenleme",
    category: "YAŞAM TARZI",
    date: "15 Ocak 2024",
    author: "Admin",
    image: "🎬",
  },
  {
    id: 2,
    title: "Harika Yapmaya Hazır mısınız?",
    category: "MATBAA MAĞAZASI",
    date: "12 Ocak 2024",
    author: "Admin",
    image: "✨",
  },
  {
    id: 3,
    title: "WordPress İçin İhtiyacınız Olan Son Matbaa Web Sitesi",
    category: "MATBAA ŞİRKETİ",
    date: "10 Ocak 2024",
    author: "Admin",
    image: "🌐",
  },
  {
    id: 4,
    title: "En İyi Baskı WordPress Teması",
    category: "MATBAA ŞİRKETİ",
    date: "8 Ocak 2024",
    author: "Admin",
    image: "🎨",
  },
];

export default function BlogSection() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog Güncellemelerimiz</h2>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base whitespace-nowrap">
            Tümünü Gör →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl sm:text-6xl">
                {post.image}
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-[10px] sm:text-xs font-bold text-primary-600 mb-1 sm:mb-2">{post.category}</div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-sm">{post.title}</h3>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {post.date} • {post.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
