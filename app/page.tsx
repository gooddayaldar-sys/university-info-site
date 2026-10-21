"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, CalendarDays, ChevronRight, GraduationCap, Search, ShieldCheck, Users, X } from "lucide-react";

type NewsItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  featured?: boolean;
};

const initialNews: NewsItem[] = [
  { id: "n1", category: "Элсэлт", title: "2026–2027 оны хичээлийн жилийн элсэлтийн бүртгэл", summary: "Шинээр элсэгчдэд зориулсан бүртгэл, материал бүрдүүлэлт болон зөвлөгөөний мэдээлэлтэй танилцана уу.", date: "2026.10.18", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85", featured: true },
  { id: "n2", category: "Сургалт", title: "Оюутны эрдэм шинжилгээний өдөрлөг болно", summary: "Оюутнууд судалгааны ажлаа танилцуулж, салбарын мэргэжилтнүүдээс санал зөвлөгөө авна.", date: "2026.10.15", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80" },
  { id: "n3", category: "Оюутны амьдрал", title: "Шинэ оюутны клубүүдэд элсэлт авч байна", summary: "Спорт, урлаг, сайн дурын ажил болон технологийн клубүүдэд нэгдээрэй.", date: "2026.10.12", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80" },
  { id: "n4", category: "Зарлал", title: "Номын сангийн ажиллах цагийн хуваарь", summary: "Шалгалтын бэлтгэлийн хугацаанд номын сангийн үйлчилгээний цагт өөрчлөлт орно.", date: "2026.10.10", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80" },
  { id: "n5", category: "Хамтын ажиллагаа", title: "Олон улсын хамтын ажиллагааны уулзалт зохион байгууллаа", summary: "Оюутан солилцоо, хамтарсан сургалт, судалгааны боломжийн талаар хэлэлцэв.", date: "2026.10.06", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80" },
  { id: "n6", category: "Сургалт", title: "Цахим сургалтын шинэ боломжууд", summary: "Суралцагчдад зориулсан цахим нөөц, сургалтын платформын шинэчлэлийг танилцуулж байна.", date: "2026.10.02", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" }
];

const categories = ["Бүгд", "Элсэлт", "Сургалт", "Зарлал", "Оюутны амьдрал", "Хамтын ажиллагаа"];

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Бүгд");
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("university-news-v1");
      if (saved) setNews(JSON.parse(saved) as NewsItem[]);
    } catch { /* ignore invalid local data */ }
  }, []);

  const filtered = useMemo(() => news.filter(item => {
    const matchesCategory = category === "Бүгд" || item.category === category;
    const haystack = `${item.title} ${item.summary} ${item.category}`.toLocaleLowerCase("mn");
    return matchesCategory && haystack.includes(query.toLocaleLowerCase("mn").trim());
  }), [news, category, query]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      window.location.href = "/admin";
    } else {
      setLoginError("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
    }
  }

  const featured = filtered.find(item => item.featured) ?? news.find(item => item.featured) ?? news[0];

  return (
    <main>
      <div className="topline"><div className="container topline-inner"><span>МЭДЛЭГ • БОЛОМЖ • ИРЭЭДҮЙ</span><span>Оюутан, багш, ажилтан, зочдод зориулсан мэдээлэл</span></div></div>
      <header className="header">
        <div className="container nav">
          <a href="#" className="brand" aria-label="Нүүр хуудас"><span className="brand-mark"><GraduationCap size={28} /></span><span><strong>ИХ СУРГУУЛЬ</strong><small>МЭДЭЭЛЛИЙН ПОРТАЛ</small></span></a>
          <nav className="nav-links"><a href="#news">Мэдээ, мэдээлэл</a><a href="#about">Сургуулийн тухай</a><a href="#admission">Элсэлт</a><a href="#contact">Холбоо барих</a></nav>
          <button className="login-button" onClick={() => setLoginOpen(true)}><ShieldCheck size={17}/> Нэвтрэх</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> ИХ СУРГУУЛИЙН АЛБАН ЁСНЫ МЭДЭЭЛЭЛ</div>
          <h1>Ирээдүйгээ<br/><em>эндээс</em> эхлүүл.</h1>
          <p>Суралцах, хөгжих, шинэ боломж нээх таны аялалд хэрэгтэй мэдээ, мэдээллийг нэг дороос.</p>
          <div className="hero-actions"><a className="button button-light" href="#news">Мэдээ үзэх <ArrowRight size={18}/></a><a className="hero-text-link" href="#admission">Элсэлтийн мэдээлэл <ChevronRight size={17}/></a></div>
          <div className="hero-stats"><div><strong>20+</strong><span>Сургалтын хөтөлбөр</span></div><div><strong>5,000+</strong><span>Оюутан суралцагч</span></div><div><strong>30+</strong><span>Жилийн туршлага</span></div></div>
        </div>
      </section>

      <section className="quick-strip"><div className="container quick-grid">
        <a href="#admission" className="quick-item"><span className="quick-icon"><GraduationCap/></span><span><strong>Элсэлт</strong><small>Бүртгэл ба шаардлага</small></span><ChevronRight/></a>
        <a href="#news" className="quick-item"><span className="quick-icon"><CalendarDays/></span><span><strong>Зарлал</strong><small>Хуваарь, үйл ажиллагаа</small></span><ChevronRight/></a>
        <a href="#about" className="quick-item"><span className="quick-icon"><BookOpen/></span><span><strong>Хөтөлбөрүүд</strong><small>Сургалтын чиглэлүүд</small></span><ChevronRight/></a>
        <a href="#contact" className="quick-item"><span className="quick-icon"><Users/></span><span><strong>Оюутны үйлчилгээ</strong><small>Тусламж, зөвлөгөө</small></span><ChevronRight/></a>
      </div></section>

      <section className="section container" id="news">
        <div className="section-heading"><div><div className="section-kicker">ХАМГИЙН СҮҮЛИЙН МЭДЭЭ</div><h2>Мэдээ, мэдээлэл</h2><p>Сургуулийн амьдрал, шинэ боломж, чухал зарлалууд.</p></div><a href="#news-list" className="all-link">Бүх мэдээ <ArrowRight size={17}/></a></div>
        <div className="search-row"><div className="search-box"><Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Мэдээ, зарлал хайх..." aria-label="Мэдээ хайх"/>{query && <button onClick={() => setQuery("")} aria-label="Хайлтыг цэвэрлэх"><X size={17}/></button>}</div><div className="category-list">{categories.map(c => <button key={c} className={category === c ? "category active" : "category"} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
        {featured && category === "Бүгд" && !query && <article className="featured-card" onClick={() => setSelected(featured)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setSelected(featured)}>
          <div className="featured-image" style={{backgroundImage:`url("${featured.image}")`}}><span className="image-label">ОНЦЛОХ МЭДЭЭ</span></div><div className="featured-copy"><div className="news-meta"><span className="tag">{featured.category}</span><span>{featured.date}</span></div><h3>{featured.title}</h3><p>{featured.summary}</p><span className="read-link">Дэлгэрэнгүй унших <ArrowRight size={17}/></span></div>
        </article>}
        <div className="news-grid" id="news-list">
          {filtered.filter(item => !(featured && category === "Бүгд" && !query && item.id === featured.id)).map(item => <article className="news-card" key={item.id} onClick={() => setSelected(item)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setSelected(item)}>
            <div className="news-image" style={{backgroundImage:`url("${item.image}")`}}/><div className="news-card-body"><div className="news-meta"><span className="tag">{item.category}</span><span>{item.date}</span></div><h3>{item.title}</h3><p>{item.summary}</p><span className="read-link">Дэлгэрэнгүй <ArrowRight size={16}/></span></div>
          </article>)}
          {filtered.length === 0 && <div className="empty-state"><Search size={28}/><h3>Мэдээ олдсонгүй</h3><p>Өөр түлхүүр үг ашиглан хайна уу.</p><button className="button button-blue" onClick={() => {setQuery("");setCategory("Бүгд")}}>Хайлтыг арилгах</button></div>}
        </div>
      </section>

      <section className="admission" id="admission"><div className="container admission-inner"><div><div className="section-kicker light-kicker">ТАНЫ ДАРААГИЙН АЛХАМ</div><h2>Ирээдүйгээ бүтээхэд<br/>бэлэн үү?</h2><p>Сургалтын хөтөлбөр, элсэлтийн нөхцөл болон бүртгэлийн талаарх мэдээллээ аваарай.</p></div><a href="#contact" className="button button-light">Элсэлтийн мэдээлэл авах <ArrowRight size={18}/></a></div></section>

      <section className="about-section" id="about"><div className="container about-grid"><div><div className="section-kicker">БИДНИЙ ТУХАЙ</div><h2>Чанартай боловсрол.<br/><span>Тодорхой ирээдүй.</span></h2></div><div><p>Бид мэдлэг, ур чадвар, бүтээлч сэтгэлгээг хөгжүүлэхэд чиглэсэн сургалт, судалгаа, хамтын ажиллагааг дэмжин ажиллана.</p><div className="about-points"><span><BookOpen/> Оюутан төвтэй сургалт</span><span><Users/> Нээлттэй хамтын нийгэмлэг</span></div></div></div></section>

      <footer id="contact"><div className="container footer-main"><div className="footer-brand"><a href="#" className="brand brand-footer"><span className="brand-mark"><GraduationCap size={27}/></span><span><strong>ИХ СУРГУУЛЬ</strong><small>МЭДЭЭЛЛИЙН ПОРТАЛ</small></span></a><p>Мэдлэг түгээж, боломж нээж, ирээдүйг хамтдаа бүтээнэ.</p></div><div><h4>Холбоосууд</h4><a href="#news">Мэдээ, мэдээлэл</a><a href="#admission">Элсэлт</a><a href="#about">Сургуулийн тухай</a></div><div><h4>Холбоо барих</h4><p>Улаанбаатар хот, Монгол Улс</p><p>info@university.edu.mn</p><p>+976 7000 0000</p></div></div><div className="footer-bottom"><div className="container">© 2026 Их Сургуулийн Мэдээллийн Портал. Бүх эрх хуулиар хамгаалагдсан.</div></div></footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="news-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Хаах"><X/></button><div className="modal-image" style={{backgroundImage:`url("${selected.image}")`}}/><div className="modal-body"><div className="news-meta"><span className="tag">{selected.category}</span><span>{selected.date}</span></div><h2>{selected.title}</h2><p>{selected.summary}</p><p>Дэлгэрэнгүй мэдээлэл авах бол сургуулийн холбогдох нэгжид хандана уу. Энэ жишээ мэдээг админ хэсгээс өөрийн сургуулийн бодит мэдээллээр сольж болно.</p></div></div></div>}

      {loginOpen && <div className="modal-backdrop" onClick={() => setLoginOpen(false)}><form className="login-modal" onSubmit={handleLogin} onClick={e => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setLoginOpen(false)} aria-label="Хаах"><X/></button><span className="login-icon"><ShieldCheck size={27}/></span><h2>Системд нэвтрэх</h2><p>Админ хэсэгт нэвтэрч мэдээ удирдах.</p><label>Нэвтрэх нэр<input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required placeholder="admin"/></label><label>Нууц үг<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required placeholder="••••••••"/></label>{loginError && <div className="form-error">{loginError}</div>}<button className="button button-blue full-button" type="submit">Нэвтрэх <ArrowRight size={17}/></button><small className="demo-note">Демо: admin / admin123</small></form></div>}
    </main>
  );
}
