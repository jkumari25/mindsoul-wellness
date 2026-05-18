import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// const BASE_URL = "https://mindsoul-backend-772700176760.asia-south1.run.app";
const BASE_URL = "http://localhost:8080";

const adminApi = axios.create({ baseURL: BASE_URL });
adminApi.interceptors.request.use((config) => {
  const t = localStorage.getItem("admin_token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// ─── tiny helpers ────────────────────────────────────────────────────────────
const fmtDate = (ts) => {
  if (!ts) return "—";
  const d = ts?._seconds
    ? new Date(ts._seconds * 1000)
    : ts?.toDate
    ? ts.toDate()
    : new Date(ts);
  return isNaN(d) ? "—" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const pill = (ok) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
    {ok ? "Yes" : "No"}
  </span>
);

const statusColor = (s = "") => {
  if (s === "completed") return "bg-emerald-100 text-emerald-700";
  if (s === "confirmed" || s === "booked") return "bg-blue-100 text-blue-700";
  if (s === "cancelled") return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-500";
};

// ─── icons (inline svg, no dep) ──────────────────────────────────────────────
const Icon = {
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  save: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, bg }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${bg}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value ?? "—"}</p>
      </div>
    </div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ src, name, size = "md", bg = "bg-indigo-100 text-indigo-600" }) {
  const sz = size === "lg" ? "w-20 h-20 text-2xl" : size === "xl" ? "w-28 h-28 text-4xl" : "w-10 h-10 text-sm";
  const letter = (name || "?")[0].toUpperCase();
  return src
    ? <img src={src} alt={name} className={`${sz} rounded-full object-cover flex-shrink-0`} />
    : <div className={`${sz} ${bg} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>{letter}</div>;
}

// ─── Section label ───────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 mt-6 first:mt-0">{children}</p>;
}

// ─── Info row ────────────────────────────────────────────────────────────────
function InfoRow({ label, children }) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <div className="text-sm text-gray-800 font-medium">{children || "—"}</div>
    </div>
  );
}

// ─── Tag list ────────────────────────────────────────────────────────────────
function Tags({ items = [], color = "indigo" }) {
  const c = { indigo: "bg-indigo-50 text-indigo-700", green: "bg-green-50 text-green-700", yellow: "bg-amber-50 text-amber-700" }[color];
  if (!items.length) return <span className="text-sm text-gray-400">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {items.map((t, i) => <span key={i} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${c}`}>{t}</span>)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.get("/api/admin/stats")
      .then(r => setStats(r.data.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Platform Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Counsellors" value={stats?.totalCounsellors} icon="🧑‍⚕️" bg="bg-blue-50" />
        <StatCard label="Active Profiles" value={stats?.activeCounsellors} icon="✅" bg="bg-emerald-50" />
        <StatCard label="Total Users" value={stats?.totalUsers} icon="👥" bg="bg-purple-50" />
        <StatCard label="Total Appointments" value={stats?.totalAppointments} icon="📅" bg="bg-orange-50" />
        <StatCard label="Completed Sessions" value={stats?.completedAppointments} icon="🎯" bg="bg-teal-50" />
        <StatCard label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`} icon="💰" bg="bg-rose-50" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COUNSELLOR LIST
// ═══════════════════════════════════════════════════════════════════════════════
function CounsellorList({ onSelect }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetch = useCallback(() => {
    setLoading(true);
    adminApi.get("/api/admin/counsellors")
      .then(r => setList(r.data.counsellors || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const filtered = list.filter(c => {
    const q = search.toLowerCase();
    return [c.email, c.firstName, c.lastName].some(s => s?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Counsellors</h2>
          <p className="text-sm text-gray-400">{list.length} total</p>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="space-y-2">
          {filtered.map(c => (
            <button key={c.id} onClick={() => onSelect(c)}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 text-left hover:border-indigo-300 hover:shadow-md transition-all group">
              <Avatar src={c.imageUrl} name={c.firstName || c.email} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition truncate">
                  {c.firstName || c.lastName ? `${c.firstName} ${c.lastName}`.trim() : "Unnamed"}
                </p>
                <p className="text-sm text-gray-400 truncate">{c.email}</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {c.profileCompleted
                    ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">Active</span>
                    : <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Incomplete</span>}
                  {c.experience && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">{c.experience} yrs</span>}
                  {c.basePrice > 0 && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">₹{c.basePrice}</span>}
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-indigo-400 transition flex-shrink-0">›</span>
            </button>
          ))}
          {!filtered.length && (
            <div className="py-16 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
              {search ? "No counsellors match your search." : "No counsellors yet."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COUNSELLOR PROFILE (view + inline edit + delete)
// ═══════════════════════════════════════════════════════════════════════════════
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function TagInput({ label, items, onChange, color = "indigo" }) {
  const [val, setVal] = useState("");
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    green:  "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const addTag = () => {
    const trimmed = val.trim();
    if (trimmed && !items.includes(trimmed)) onChange([...items, trimmed]);
    setVal("");
  };
  const removeTag = (i) => onChange(items.filter((_, idx) => idx !== i));
  const onKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && val === "" && items.length) removeTag(items.length - 1);
  };
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      <div className="flex flex-wrap gap-1.5 min-h-[42px] border border-gray-200 rounded-xl px-2.5 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent cursor-text"
        onClick={e => e.currentTarget.querySelector("input")?.focus()}>
        {items.map((t, i) => (
          <span key={i} className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[color]}`}>
            {t}
            <button type="button" onClick={() => removeTag(i)} className="opacity-60 hover:opacity-100 leading-none cursor-pointer">×</button>
          </span>
        ))}
        <input
          value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} onBlur={addTag}
          placeholder={items.length ? "" : "Type and press Enter…"}
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-gray-300 cursor-text" />
      </div>
    </div>
  );
}

function AutoTextarea({ label, name, value, onChange }) {
  const ref = useCallback(el => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, []);
  const onInput = e => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange(e);
  };
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      <textarea ref={ref} name={name} value={value} onInput={onInput} onChange={onChange} rows={2}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 resize-none overflow-hidden" />
    </div>
  );
}

function CounsellorProfile({ counsellor: initial, onBack, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState(initial);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useCallback(el => { if (el) el.value = ""; }, []);

  const [form, setForm] = useState({
    firstName:       initial.firstName || "",
    lastName:        initial.lastName || "",
    email:           initial.email || "",
    phoneNumber:     initial.phoneNumber || "",
    description:     initial.description || "",
    experience:      initial.experience || "",
    basePrice:       initial.basePrice || "",
    platformFee:     initial.platformFee || "",
    slotDuration:    initial.slotDuration || "",
    expertise:       initial.expertise || [],
    focusAreas:      initial.focusAreas || [],
    languages:       initial.languages || [],
    workingDays:     initial.workingDays || [],
    isVerified:      initial.isVerified ?? false,
    profileCompleted: initial.profileCompleted ?? false,
  });

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const setField = (name, value) => setForm(p => ({ ...p, [name]: value }));

  const pickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toggleDay = day => setForm(p => ({
    ...p,
    workingDays: p.workingDays.includes(day)
      ? p.workingDays.filter(d => d !== day)
      : [...p.workingDays, day],
  }));

  const save = async () => {
    setSaving(true); setError(""); setSuccess("");
    try {
      const base = Number(form.basePrice) || 0;
      const fee  = Number(form.platformFee) || Math.round(base * 0.2);

      let res;
      if (imageFile) {
        const fd = new FormData();
        fd.append("profileImage", imageFile);
        fd.append("firstName",       form.firstName);
        fd.append("lastName",        form.lastName);
        fd.append("email",           form.email);
        fd.append("phoneNumber",     form.phoneNumber);
        fd.append("description",     form.description);
        fd.append("experience",      form.experience);
        fd.append("basePrice",       base);
        fd.append("platformFee",     fee);
        fd.append("sessionPrice",    base + fee);
        fd.append("slotDuration",    Number(form.slotDuration) || 60);
        fd.append("expertise",       JSON.stringify(form.expertise));
        fd.append("focusAreas",      JSON.stringify(form.focusAreas));
        fd.append("languages",       JSON.stringify(form.languages));
        fd.append("workingDays",     JSON.stringify(form.workingDays));
        fd.append("isVerified",      form.isVerified);
        fd.append("profileCompleted", form.profileCompleted);
        res = await adminApi.put(`/api/admin/counsellors/${data.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await adminApi.put(`/api/admin/counsellors/${data.id}`, {
          ...form,
          basePrice:    base,
          platformFee:  fee,
          sessionPrice: base + fee,
          slotDuration: Number(form.slotDuration) || 60,
        });
      }

      const pd = res.data.counsellor?.profileData || {};
      const newImageUrl = pd.imageUrl || data.imageUrl;
      setData(prev => ({
        ...prev, ...form,
        basePrice:    base,
        platformFee:  fee,
        sessionPrice: pd.sessionPrice || base + fee,
        imageUrl:     newImageUrl,
      }));
      setImageFile(null);
      setImagePreview(null);
      setEditing(false);
      setSuccess("Profile updated successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(e.response?.data?.message || "Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    setDeleting(true);
    try {
      await adminApi.delete(`/api/admin/counsellors/${data.id}`);
      onDeleted();
    } catch (e) {
      setError(e.response?.data?.message || "Delete failed.");
      setConfirmDel(false);
    } finally {
      setDeleting(false);
    }
  };

  const cancelEdit = () => { setEditing(false); setError(""); setImageFile(null); setImagePreview(null); };

  const Input = ({ label, name, type = "text" }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
      <input type={type} name={name} value={form[name]} onChange={handle}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50" />
    </div>
  );

  return (
    <div className="space-y-0">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium text-sm transition">
          {Icon.back} Back to Counsellors
        </button>
        {!editing ? (
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
              {Icon.edit} Edit
            </button>
            <button onClick={() => setConfirmDel(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition">
              {Icon.trash} Delete
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={cancelEdit}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              {Icon.close} Cancel
            </button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60">
              {Icon.save} {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmDel && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-red-700">Delete this counsellor?</p>
            <p className="text-sm text-red-500 mt-0.5">This is permanent and cannot be undone.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => setConfirmDel(false)} className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-white transition">Cancel</button>
            <button onClick={doDelete} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition disabled:opacity-60">
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      )}

      {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl px-4 py-3 mb-4">{success}</div>}
      {error   && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>}

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-24 sm:h-32" />
        <div className="px-6 pb-8">
          <div className="-mt-10 sm:-mt-14 mb-4 flex items-end justify-between">
            {editing ? (
              <label className="cursor-pointer group relative flex-shrink-0">
                <input type="file" accept="image/*" onChange={pickImage} ref={fileInputRef} className="hidden" />
                <div className="relative w-28 h-28">
                  {imagePreview || data.imageUrl
                    ? <img src={imagePreview || data.imageUrl} alt="" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                    : <div className="w-28 h-28 rounded-full bg-indigo-100 text-indigo-600 border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold">
                        {(data.firstName?.[0] || data.email?.[0] || "?").toUpperCase()}
                      </div>
                  }
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold text-center px-1">Change photo</span>
                  </div>
                </div>
                {imageFile && <p className="text-xs text-indigo-600 mt-1 text-center font-medium">{imageFile.name}</p>}
              </label>
            ) : (
              <Avatar src={data.imageUrl} name={data.firstName || data.email} size="xl" bg="bg-white text-indigo-600 border-4 border-white shadow-lg" />
            )}
            <div className="mb-1 flex gap-2">
              {pill(data.isVerified)}
              {data.profileCompleted
                ? <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Active</span>
                : <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Incomplete</span>}
            </div>
          </div>

          {editing ? (
            <div className="space-y-5">
              <SectionLabel>Basic Info</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" />
                <Input label="Last Name" name="lastName" />
                <Input label="Email" name="email" type="email" />
                <Input label="Phone Number" name="phoneNumber" />
                <Input label="Experience (yrs)" name="experience" />
                <Input label="Slot Duration (min)" name="slotDuration" type="number" />
              </div>

              <SectionLabel>Pricing</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="Base Price (₹)" name="basePrice" type="number" />
                <Input label="Platform Fee (₹)" name="platformFee" type="number" />
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Session Price (auto)</label>
                  <div className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-100 text-gray-500">
                    ₹{(Number(form.basePrice) || 0) + (Number(form.platformFee) || 0)}
                  </div>
                </div>
              </div>

              <SectionLabel>About</SectionLabel>
              <AutoTextarea label="Description" name="description" value={form.description} onChange={handle} />

              <SectionLabel>Specialisation</SectionLabel>
              <div className="space-y-3">
                <TagInput label="Expertise" items={form.expertise} onChange={v => setField("expertise", v)} color="indigo" />
                <TagInput label="Focus Areas" items={form.focusAreas} onChange={v => setField("focusAreas", v)} color="green" />
                <TagInput label="Languages" items={form.languages} onChange={v => setField("languages", v)} color="yellow" />
              </div>

              <SectionLabel>Working Days</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(day => (
                  <button key={day} type="button" onClick={() => toggleDay(day)}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition select-none
                      ${form.workingDays.includes(day)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"}`}>
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>

              <SectionLabel>Account Status</SectionLabel>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input type="checkbox" name="isVerified" checked={form.isVerified} onChange={handle} className="w-4 h-4 accent-indigo-600" />
                  Verified
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input type="checkbox" name="profileCompleted" checked={form.profileCompleted} onChange={handle} className="w-4 h-4 accent-indigo-600" />
                  Profile Completed
                </label>
              </div>

              <SectionLabel>Read-only</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Joined">{fmtDate(data.createdAt)}</InfoRow>
                <InfoRow label="Last Updated">{fmtDate(data.updatedAt)}</InfoRow>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {data.firstName || data.lastName ? `${data.firstName} ${data.lastName}`.trim() : "Unnamed Counsellor"}
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">{data.email}</p>

              <SectionLabel>Basic Info</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow label="Phone">{data.phoneNumber}</InfoRow>
                <InfoRow label="Experience">{data.experience ? `${data.experience} years` : null}</InfoRow>
                <InfoRow label="Base Price">₹{data.basePrice || 0}</InfoRow>
                <InfoRow label="Session Price (with fee)">₹{data.sessionPrice || 0}</InfoRow>
                <InfoRow label="Platform Fee">₹{data.platformFee || 0}</InfoRow>
                <InfoRow label="Slot Duration">{data.slotDuration ? `${data.slotDuration} min` : null}</InfoRow>
                <InfoRow label="Joined">{fmtDate(data.createdAt)}</InfoRow>
                <InfoRow label="Last Updated">{fmtDate(data.updatedAt)}</InfoRow>
              </div>

              <SectionLabel>About</SectionLabel>
              <p className="text-sm text-gray-700 leading-relaxed">{data.description || "—"}</p>

              <SectionLabel>Specialisation</SectionLabel>
              <div className="space-y-3">
                <div><p className="text-xs text-gray-400 mb-1">Expertise</p><Tags items={data.expertise} color="indigo" /></div>
                <div><p className="text-xs text-gray-400 mb-1">Focus Areas</p><Tags items={data.focusAreas} color="green" /></div>
                <div><p className="text-xs text-gray-400 mb-1">Languages</p><Tags items={data.languages} color="yellow" /></div>
              </div>

              {data.workingDays?.length > 0 && (
                <>
                  <SectionLabel>Working Days</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {data.workingDays.map((d, i) => <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{d}</span>)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER LIST
// ═══════════════════════════════════════════════════════════════════════════════
function UserList({ onSelect }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminApi.get("/api/admin/users")
      .then(r => setList(r.data.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(u => {
    const q = search.toLowerCase();
    return [u.email, u.name].some(s => s?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Users</h2>
          <p className="text-sm text-gray-400">{list.length} total</p>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="space-y-2">
          {filtered.map(u => (
            <button key={u.id} onClick={() => onSelect(u)}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 text-left hover:border-indigo-300 hover:shadow-md transition-all group">
              <Avatar src={u.photoURL} name={u.name || u.email} size="md" bg="bg-purple-100 text-purple-600" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition truncate">{u.name || "Unnamed"}</p>
                <p className="text-sm text-gray-400 truncate">{u.email}</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs capitalize">{u.authProvider || "email"}</span>
                  {u.profileCompleted
                    ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">Profile done</span>
                    : <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">Incomplete</span>}
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-indigo-400 transition flex-shrink-0">›</span>
            </button>
          ))}
          {!filtered.length && (
            <div className="py-16 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
              {search ? "No users match your search." : "No users yet."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER PROFILE (view only)
// ═══════════════════════════════════════════════════════════════════════════════
function UserProfile({ user, onBack }) {
  return (
    <div className="space-y-0">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium text-sm transition mb-6">
        {Icon.back} Back to Users
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 h-24 sm:h-32" />
        <div className="px-6 pb-6">
          <div className="-mt-10 sm:-mt-14 mb-4">
            <Avatar src={user.photoURL} name={user.name || user.email} size="xl" bg="bg-white text-purple-600 border-4 border-white shadow-lg" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">{user.name || "Unnamed User"}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{user.email}</p>

          <SectionLabel>Account Info</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="Auth Provider"><span className="capitalize">{user.authProvider}</span></InfoRow>
            <InfoRow label="Role"><span className="capitalize">{user.role}</span></InfoRow>
            <InfoRow label="Profile Completed">{pill(user.profileCompleted)}</InfoRow>
            <InfoRow label="Phone">{user.phone}</InfoRow>
            <InfoRow label="Joined">{fmtDate(user.createdAt)}</InfoRow>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APPOINTMENTS
// ═══════════════════════════════════════════════════════════════════════════════
function Appointments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminApi.get("/api/admin/appointments")
      .then(r => setList(r.data.appointments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(a => {
    const q = search.toLowerCase();
    return [a.counsellorName, a.studentName, a.studentEmail, a.status].some(s => s?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Appointments</h2>
          <p className="text-sm text-gray-400">{list.length} total</p>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="space-y-2">
          {filtered.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(a.status)}`}>{a.status || "unknown"}</span>
                    {a.amount > 0 && <span className="text-xs text-gray-500 font-medium">₹{a.amount}</span>}
                  </div>
                  <p className="font-semibold text-gray-900 truncate">
                    {a.counsellorName || a.counsellorEmail} → {a.studentName || a.studentEmail}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">{a.studentEmail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">{a.date || "—"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.timeSlot || "—"}</p>
                  <p className="text-xs text-gray-400 mt-1">Booked {fmtDate(a.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div className="py-16 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
              {search ? "No appointments match your search." : "No appointments yet."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Loader ──────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SHELL
// ═══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "overview", label: "Overview", icon: Icon.chart },
  { id: "counsellors", label: "Counsellors", icon: Icon.people },
  { id: "users", label: "Users", icon: Icon.user },
  { id: "appointments", label: "Appointments", icon: Icon.calendar },
];

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const [subview, setSubview] = useState(null); // { type: 'counsellor'|'user', data }

  const switchTab = (id) => { setTab(id); setSubview(null); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">M</div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Mindsoul</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => switchTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${tab === t.id ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200" : "text-gray-600 hover:bg-gray-100"}`}>
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition">
            {Icon.logout} Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0">
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8 max-w-5xl w-full mx-auto">
          {subview?.type === "counsellor" && (
            <CounsellorProfile
              counsellor={subview.data}
              onBack={() => setSubview(null)}
              onDeleted={() => setSubview(null)}
            />
          )}
          {subview?.type === "user" && (
            <UserProfile
              user={subview.data}
              onBack={() => setSubview(null)}
            />
          )}
          {!subview && tab === "overview" && <Overview />}
          {!subview && tab === "counsellors" && (
            <CounsellorList onSelect={data => setSubview({ type: "counsellor", data })} />
          )}
          {!subview && tab === "users" && (
            <UserList onSelect={data => setSubview({ type: "user", data })} />
          )}
          {!subview && tab === "appointments" && <Appointments />}
        </main>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 flex z-20 safe-area-pb">
        {TABS.map(t => (
          <button key={t.id} onClick={() => switchTab(t.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
              ${tab === t.id ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
            <span className={`${tab === t.id ? "scale-110" : ""} transition-transform`}>{t.icon}</span>
            <span className="truncate">{t.label}</span>
          </button>
        ))}
        <button onClick={onLogout}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium text-red-400">
          {Icon.logout}
          <span>Sign out</span>
        </button>
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, { email, password });
      localStorage.setItem("admin_token", res.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-indigo-600 rounded-2xl items-center justify-center text-white text-2xl font-bold mb-5 shadow-lg shadow-indigo-200">M</div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Mindsoul Wellness Platform</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="admin@mindsoul.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-14 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-500 hover:text-indigo-700">
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 text-sm transition shadow-sm shadow-indigo-300 disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">Restricted — authorised personnel only</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function SuperAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin_token")) setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  return <Dashboard onLogout={() => { localStorage.removeItem("admin_token"); setIsLoggedIn(false); }} />;
}
