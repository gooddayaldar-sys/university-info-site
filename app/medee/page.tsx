
export default function MedeePage() {
  const medee = [
    {
      title: "Их сургуулийн мэдээ, мэдээлэл",
      description: "Их сургуулийн үйл ажиллагаа, шинэ мэдээллийг энд нийтэлнэ.",
    },
    {
      title: "Оюутны үйл ажиллагаа",
      description: "Оюутны клуб, арга хэмжээ болон бусад үйл ажиллагаа.",
    },
    {
      title: "Сургалт, судалгаа",
      description: "Сургалт, эрдэм шинжилгээний ажлын мэдээлэл.",
    },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <h1 className="mb-3 text-3xl font-bold text-blue-900">
        Мэдээ, мэдээлэл
      </h1>
      <p className="mb-8 text-gray-600">
        Их сургуулийн сүүлийн үеийн мэдээлэл
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {medee.map((item, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="mb-3 text-xl font-semibold">
              {item.title}
            </h2>
            <p className="text-gray-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
