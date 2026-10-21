"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Plus, Save, Trash2, GraduationCap, Newspaper } from "lucide-react";

type NewsItem = { id: string; category: string; title: string; summary: string; date: string; image: string; featured?: boolean };
const seed: NewsItem[] = [
  { id: "n1", category: "Элсэлт", title: "2026–2027 оны хичээлийн жилийн элсэлтийн бүртгэл", summary: "Шинээр элсэгчдэд зориулсан бүртгэл, материал бүрдүүлэлт болон зөвлөгөөний мэдээлэлтэй танилцана уу.", date: "2026.10.18", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85", featured: true },
  { id: "n2", category: "Сургалт", title: "Оюутны эрдэм шинжилгээний өдөрлөг болно", summary: "Оюутнууд судалгааны ажлаа танилцуулж, салбарын мэргэжилтнүүдээс санал зөвлөгөө авна.", date: "2026.10.15", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80" },
  { id: "n3", category: "Оюутны амьдрал", title: "Шинэ оюутны клубүүдэд элсэлт авч байна", summary: "Спорт, урлаг, сайн дурын ажил болон технологийн клубүүдэд нэгдээрэй.", date: "2026.10.12", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80" }
];
const blank = (): NewsItem => ({ id: `n${Date.now()}`, category: "Сургалт", title: "", summary: "", date: new Date().toLocaleDateString("sv-SE").replaceAll("-", "."), image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80" });

export default function AdminPage() {
  const [items, setItems] = useState<NewsItem[]>(seed);
  const [form, setForm] = useState<NewsItem | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const ok = sessionStorage.getItem("university-admin-session") === "yes";
    setAuthenticated(ok);
    try {
      const saved = localStorage.getItem("university-news-v1");
      if (saved) setItems(JSON.parse(saved) as NewsItem[]);
    } catch { /* use seed */ }
  }, []);

  function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("university-admin-session", "yes");
      setAuthenticated(true);
      setError("");
    } else setError("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
  }
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const next = form.id && items.some(x => x.id === form.id) ? items.map(x => x.id === form.id ? form : x) : [form, ...items];
    setItems(next);
    localStorage.setItem("university-news-v1", JSON.stringify(next));
    setForm(null);
    setNotice("Мэдээ хадгалагдлаа. Нүүр хуудсыг шинэчилж шалгана уу.");
    window.setTimeout(() => setNotice(""), 3500);
  }
  function remove(id: string) {
    if (!window.confirm("Энэ мэдээг устгах уу?")) return;
    const next = items.filter(x => x.id !== id);
    setItems(next);
    localStorage.setItem("university-news-v1", JSON.stringify(next));
    setNotice("Мэдээ устгагдлаа.");
  }

  if (!authenticated) return <main className="admin-login-page"><form className="login-modal admin-login" onSubmit={signIn}><a className="back-home" href="/"><ArrowLeft size={17}/> Нүүр хуудас</a><span className="login-icon"><GraduationCap size={28}/></span><h2>Админ нэвтрэх</h2><p>Мэдээ, мэдээллээ удирдах хэсэг.</p><label>Нэвтрэх нэр<input value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username"/></label><label>Нууц үг<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Нууц үг"/></label>{error && <div className="form-error">{error}</div>}<button className="button button-blue full-button">Нэвтрэх <ArrowLeft size={16}/></button><small className="demo-note">Демо: admin / admin123</small></form></main>;

  return <main className="admin-page"><header className="admin-header"><div className="container admin-header-inner"><a className="brand" href="/"><span className="brand-mark"><GraduationCap size={27}/></span><span><strong>ИХ СУРГУУЛЬ</strong><small>АДМИН УДИРДЛАГА</small></span></a><div className="admin-actions"><a className="admin-home-link" href="/"><ArrowLeft size={16}/> Сайт руу буцах</a><button className="logout-button" onClick={() => {sessionStorage.removeItem("university-admin-session");setAuthenticated(false);}}><LogOut size={16}/> Гарах</button></div></div></header>
    <section className="container admin-content"><div className="admin-title-row"><div><div className="section-kicker">УДИРДЛАГЫН САМБАР</div><h1>Мэдээ удирдах</h1><p>Мэдээ нэмэх, засах, устгах боломжтой.</p></div><button className="button button-blue" onClick={() => setForm(blank())}><Plus size={18}/> Шинэ мэдээ</button></div>
    {notice && <div className="notice">{notice}</div>}
    {form && <form className="edit-form" onSubmit={save}><div className="edit-form-heading"><h2>{items.some(x => x.id === form.id) ? "Мэдээ засах" : "Шинэ мэдээ"}</h2><button type="button" className="text-button" onClick={() => setForm(null)}>Болих</button></div><div className="form-grid"><label>Гарчиг<input required value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="Мэдээний гарчиг"/></label><label>Ангилал<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>{["Элсэлт","Сургалт","Зарлал","Оюутны амьдрал","Хамтын ажиллагаа"].map(c => <option key={c}>{c}</option>)}</select></label><label>Огноо<input required value={form.date} onChange={e => setForm({...form,date:e.target.value})} placeholder="2026.10.21"/></label><label>Зургийн URL<input required value={form.image} onChange={e => setForm({...form,image:e.target.value})} placeholder="https://..."/></label><label className="wide-field">Товч тайлбар<textarea required rows={3} value={form.summary} onChange={e => setForm({...form,summary:e.target.value})} placeholder="Мэдээний товч агуулга"/></label><label className="check-field"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({...form,featured:e.target.checked})}/> Онцлох мэдээ болгох</label></div><button className="button button-blue" type="submit"><Save size={17}/> Хадгалах</button></form>}
    <div className="admin-table-wrap"><div className="admin-table-title"><h2><Newspaper size={20}/> Нийт мэдээ</h2><span>{items.length} мэдээ</span></div><div className="admin-news-list">{items.map(item => <article className="admin-news-row" key={item.id}><div className="admin-thumb" style={{backgroundImage:`url("${item.image}")`}}/><div className="admin-news-info"><span className="tag">{item.category}</span><h3>{item.title}</h3><p>{item.date} · {item.summary}</p></div><div className="row-actions"><button className="edit-button" onClick={() => setForm(item)}>Засах</button><button className="delete-button" onClick={() => remove(item.id)} aria-label="Устгах"><Trash2 size={17}/></button></div></article>)}</div></div>
    <div className="demo-warning"><strong>Туршилтын хувилбар:</strong> мэдээлэл энэ браузерын localStorage-д хадгалагдана. Бодит олон хэрэглэгчтэй сайт болгохын тулд серверийн өгөгдлийн сан, хамгаалалттай нэвтрэлт болон API нэмэх шаардлагатай.</div>
    </section></main>;
}
