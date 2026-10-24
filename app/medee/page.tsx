
export default function MedeePage() {
  const medee = [
    {
      title: "Их сургуулийн мэдээ",
      description: "Их сургуулийн үйл ажиллагаа, шинэ мэдээ мэдээлэл.",
      icon: "📰",
    },
    {
      title: "Оюутны амьдрал",
      description: "Оюутны клуб, арга хэмжээ, сонирхолтой үйл ажиллагаа.",
      icon: "🎓",
    },
    {
      title: "Сургалт, судалгаа",
      description: "Сургалтын хөтөлбөр, эрдэм шинжилгээний мэдээлэл.",
      icon: "📚",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-2xl bg-blue-900 px-8 py-12 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-200">
            ИХ СУРГУУЛИЙН МЭДЭЭЛЛИЙН ПОРТАЛ
          </p>
          <h1 className="mb-4 text-3xl font-bold md:text-5xl">
            Мэдээ, мэдээлэл
          </h1>
          <p className="text-blue-100">
            Их сургуулийн шинэ мэдээ, үйл ажиллагаа болон мэдээлэлтэй танилцаарай.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          Мэдээний ангилал
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {medee.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 text-4xl">{item.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-blue-900">
                {item.title}
              </h3>
              <p className="leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-blue-50 p-6 text-center">
          <p className="font-medium text-blue-900">
            Их сургуулийн мэдээллийн нэгдсэн портал
          </p>
        </div>
      </div>
    </main>
  );
}
