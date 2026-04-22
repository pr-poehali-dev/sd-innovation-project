import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/70d76ec6-fc96-4f09-8985-191a142fc170.jpg";
const SONIC_HERO = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/3f9f33c7-491f-4a9c-a17e-713c0bf198cb.jpg";
const SONIC_TEAM = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/d9921e68-e78b-462d-af2c-5508d8e907c9.jpg";

const TABS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "rating", label: "Рейтинг", icon: "Trophy" },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "events", label: "События", icon: "Zap" },
  { id: "characters", label: "Персонажи", icon: "Star" },
  { id: "shop", label: "Магазин", icon: "ShoppingBag" },
  { id: "clans", label: "Кланы", icon: "Shield" },
  { id: "chat", label: "Чат", icon: "MessageCircle" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

const PLAYERS = [
  { rank: 1, name: "SonicBlaze", level: 99, xp: 98450, avatar: "⚡", char: "Соник", badge: "🏆" },
  { rank: 2, name: "ShadowX", level: 95, xp: 87200, avatar: "🌑", char: "Шэдоу", badge: "🥈" },
  { rank: 3, name: "TailsFox", level: 92, xp: 76800, avatar: "🦊", char: "Тейлз", badge: "🥉" },
  { rank: 4, name: "AmyRose99", level: 88, xp: 65400, avatar: "🌸", char: "Эми", badge: "⭐" },
  { rank: 5, name: "KnucklesPro", level: 85, xp: 59300, avatar: "💎", char: "Наклз", badge: "⭐" },
  { rank: 6, name: "RougeWings", level: 81, xp: 51200, avatar: "🦇", char: "Руж", badge: "⭐" },
  { rank: 7, name: "SilverHero", level: 78, xp: 46700, avatar: "🔮", char: "Силвер", badge: "" },
  { rank: 8, name: "BlazeCat", level: 75, xp: 41500, avatar: "🔥", char: "Блэйз", badge: "" },
];

const CHARACTERS = [
  { name: "Соник", role: "Скорость", element: "Молния", rarity: "Легендарный", color: "#00BFFF", emoji: "⚡", power: 98, owned: true },
  { name: "Шэдоу", role: "Атака", element: "Тьма", rarity: "Легендарный", color: "#9B30FF", emoji: "🌑", power: 96, owned: true },
  { name: "Тейлз", role: "Поддержка", element: "Механика", rarity: "Эпический", color: "#FFD700", emoji: "🦊", power: 85, owned: true },
  { name: "Эми", role: "Целитель", element: "Любовь", rarity: "Редкий", color: "#FF69B4", emoji: "🌸", power: 79, owned: false },
  { name: "Наклз", role: "Защита", element: "Земля", rarity: "Эпический", color: "#FF4500", emoji: "💎", power: 91, owned: false },
  { name: "Блэйз", role: "Маг", element: "Огонь", rarity: "Легендарный", color: "#FF6347", emoji: "🔥", power: 94, owned: false },
];

const EVENTS = [
  {
    id: 1, title: "ТУРНИР СКОРОСТИ", subtitle: "Sonic Speed Cup", timeLeft: "2д 14ч 33м",
    reward: "5000 XP + Скин Соник", status: "active", color: "from-blue-500 to-cyan-400", emoji: "⚡", progress: 65,
  },
  {
    id: 2, title: "ТЁМНАЯ АРЕНА", subtitle: "Shadow's Revenge", timeLeft: "5д 8ч 12м",
    reward: "8000 XP + Персонаж Шэдоу", status: "active", color: "from-purple-600 to-pink-500", emoji: "🌑", progress: 30,
  },
  {
    id: 3, title: "ПРАЗДНИК ХАОСА", subtitle: "Chaos Festival", timeLeft: "Завтра 00:00",
    reward: "Изумруд Хаоса", status: "soon", color: "from-yellow-400 to-orange-500", emoji: "💎", progress: 0,
  },
];

const PASS_TIERS = [
  { level: 1, reward: "100 монет", done: true },
  { level: 5, reward: "Рамка профиля", done: true },
  { level: 10, reward: "Скин «Неон»", done: true },
  { level: 20, reward: "Персонаж Тейлз", done: false },
  { level: 30, reward: "Изумруд Хаоса", done: false },
  { level: 50, reward: "Легендарный Шэдоу", done: false },
];

const rarityColor: Record<string, string> = {
  "Легендарный": "from-yellow-400 to-orange-500",
  "Эпический": "from-purple-500 to-pink-500",
  "Редкий": "from-blue-400 to-cyan-400",
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [xp, setXp] = useState(12450);
  const [level, setLevel] = useState(23);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; hue: number }[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 20 + 10,
      hue: Math.floor(Math.random() * 360),
    }));
    setParticles(p);
  }, []);

  const xpPercent = Math.round((xp % 5000) / 50);
  const xpToNext = 5000 - (xp % 5000);

  return (
    <div className="min-h-screen font-nunito overflow-x-hidden" style={{ background: "#0a0015" }}>
      {/* Animated BG */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(120,0,255,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,200,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(255,0,150,0.2) 0%, transparent 60%)"
        }} />
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-60"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              background: `hsl(${p.hue}, 100%, 70%)`,
              boxShadow: `0 0 ${p.size * 3}px hsl(${p.hue}, 100%, 70%)`,
              animation: `floatUp ${p.speed}s ease-in-out infinite`,
              animationDelay: `${-Math.random() * p.speed}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(10,0,30,0.85)", borderBottom: "1px solid rgba(180,100,255,0.3)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-orbitron font-black text-xl" style={{ background: "linear-gradient(90deg,#00BFFF,#FF69B4,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AniQuest
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-yellow-300"
            style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}>
            <span>💎</span><span>4,820</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-cyan-300"
            style={{ background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.4)" }}>
            <span>⚡</span><span>Ур.{level}</span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>⚡</div>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="relative z-20 flex overflow-x-auto gap-1 px-3 py-2 no-scrollbar"
        style={{ background: "rgba(10,0,30,0.7)", borderBottom: "1px solid rgba(120,0,255,0.2)" }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
            style={activeTab === tab.id ? {
              background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)",
              color: "#fff",
              boxShadow: "0 0 15px rgba(120,47,255,0.7)"
            } : {
              color: "rgba(200,180,255,0.7)",
              background: "rgba(255,255,255,0.05)"
            }}
          >
            <Icon name={tab.icon} size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="relative z-10 pb-6 px-3 pt-4">

        {/* HOME */}
        {activeTab === "home" && (
          <div className="space-y-4 animate-fade-in">
            {/* Hero banner */}
            <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 200 }}>
              <img src={SONIC_HERO} alt="Sonic" className="w-full h-52 object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,0,30,0.95) 0%, rgba(10,0,30,0.4) 50%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Добро пожаловать, Герой!</div>
                <h2 className="font-orbitron font-black text-2xl text-white leading-tight">МИР<br />
                  <span style={{ background: "linear-gradient(90deg,#00BFFF,#FF69B4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>АНИМЕ & СОНИК</span>
                </h2>
              </div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black text-white"
                style={{ background: "linear-gradient(90deg,#FF2F7B,#FF6B35)", boxShadow: "0 0 12px rgba(255,47,123,0.7)" }}>
                🔥 ГОРЯЧО
              </div>
            </div>

            {/* XP Bar */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(180,100,255,0.25)", backdropFilter: "blur(10px)" }}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-orbitron font-black text-white text-lg">Уровень {level}</span>
                  <span className="text-purple-400 text-sm ml-2">SonicFan</span>
                </div>
                <span className="text-cyan-400 text-sm font-bold">{xpToNext} XP до след.</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%`, background: "linear-gradient(90deg,#7B2FFF,#00BFFF,#FF2F7B)", boxShadow: "0 0 10px rgba(0,191,255,0.7)" }} />
              </div>
              <div className="flex justify-between text-xs text-purple-400 mt-1">
                <span>{xp.toLocaleString()} XP</span><span>{xpPercent}%</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Победы", value: "247", icon: "Trophy", color: "#FFD700" },
                { label: "Серия", value: "12🔥", icon: "Zap", color: "#00BFFF" },
                { label: "Ранг", value: "#4", icon: "Star", color: "#FF69B4" },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon name={s.icon} size={20} className="mx-auto mb-1" style={{ color: s.color }} />
                  <div className="font-orbitron font-black text-lg text-white">{s.value}</div>
                  <div className="text-xs text-purple-300">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Active event preview */}
            <div className="rounded-2xl p-4 relative overflow-hidden cursor-pointer" onClick={() => setActiveTab("events")}
              style={{ background: "linear-gradient(135deg,rgba(0,80,180,0.5),rgba(120,0,255,0.4))", border: "1px solid rgba(0,191,255,0.4)" }}>
              <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">⚡ Активное событие</div>
              <div className="font-orbitron font-black text-white text-lg">ТУРНИР СКОРОСТИ</div>
              <div className="text-sm text-cyan-300 mt-1">Осталось: 2д 14ч 33м</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-30">⚡</div>
            </div>

            {/* Team image */}
            <div className="rounded-2xl overflow-hidden">
              <img src={SONIC_TEAM} alt="Sonic Team" className="w-full h-40 object-cover" />
              <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,100,255,0.2)" }}>
                <div className="font-bold text-white text-sm">Команда Соника</div>
                <div className="text-xs text-purple-300">Все любимые персонажи в аниме-стиле ✨</div>
              </div>
            </div>
          </div>
        )}

        {/* RATING */}
        {activeTab === "rating" && (
          <div className="space-y-3 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">
              <span>🏆</span> Топ Игроков
            </div>
            {/* Podium */}
            <div className="flex items-end justify-center gap-3 mb-6 px-2">
              {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((p, i) => {
                const heights = ["h-20", "h-28", "h-16"];
                const colors = ["from-gray-400 to-gray-300", "from-yellow-400 to-orange-400", "from-orange-400 to-yellow-600"];
                const positions = [2, 1, 3];
                return (
                  <div key={p.rank} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-3xl">{p.avatar}</div>
                    <div className="text-xs text-white font-bold truncate max-w-full text-center">{p.name}</div>
                    <div className={`w-full rounded-t-xl ${heights[i]} flex items-center justify-center bg-gradient-to-t ${colors[i]}`}>
                      <span className="font-orbitron font-black text-2xl text-white">{positions[i]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* List */}
            {PLAYERS.map((p, idx) => (
              <div key={p.rank} className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ background: idx === 0 ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${idx === 0 ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}` }}>
                <div className="font-orbitron font-black text-lg w-6 text-center"
                  style={{ color: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "#888" }}>
                  {p.rank}
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm truncate">{p.name} {p.badge}</div>
                  <div className="text-xs text-purple-300">{p.char} · Ур.{p.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-orbitron font-black text-cyan-400 text-sm">{p.xp.toLocaleString()}</div>
                  <div className="text-xs text-purple-400">XP</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === "progress" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">
              <span>📈</span> Прогрессия
            </div>
            {/* Level card */}
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,rgba(123,47,255,0.4),rgba(0,191,255,0.3))", border: "1px solid rgba(120,100,255,0.4)" }}>
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">⚡</div>
                <div className="font-orbitron font-black text-4xl text-white">{level}</div>
                <div className="text-purple-300 text-sm">текущий уровень</div>
              </div>
              <div className="h-4 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full rounded-full" style={{
                  width: `${xpPercent}%`,
                  background: "linear-gradient(90deg,#7B2FFF,#00BFFF,#FF2F7B)",
                  boxShadow: "0 0 12px rgba(0,191,255,0.9)"
                }} />
              </div>
              <div className="flex justify-between text-sm text-white font-bold">
                <span>{xp.toLocaleString()} XP</span>
                <span>{(Math.ceil(xp / 5000) * 5000).toLocaleString()} XP</span>
              </div>
            </div>

            {/* Battle Pass */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,215,0,0.4)" }}>
              <div className="p-3 flex items-center justify-between"
                style={{ background: "linear-gradient(90deg,rgba(255,150,0,0.4),rgba(255,50,150,0.3))" }}>
                <div className="font-orbitron font-black text-white">⚔️ Боевой Пропуск</div>
                <div className="text-xs px-2 py-1 rounded-full font-bold text-yellow-300"
                  style={{ background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.5)" }}>СЕЗОН 1</div>
              </div>
              <div className="p-3 space-y-2" style={{ background: "rgba(10,0,30,0.7)" }}>
                {PASS_TIERS.map(t => (
                  <div key={t.level} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-orbitron font-black"
                      style={t.done ? { background: "linear-gradient(135deg,#FFD700,#FF6B35)", color: "#000" } : { background: "rgba(255,255,255,0.08)", color: "#888" }}>
                      {t.level}
                    </div>
                    <div className={`flex-1 text-sm font-bold ${t.done ? "text-white" : "text-gray-500"}`}>{t.reward}</div>
                    <div>{t.done ? "✅" : "🔒"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="font-bold text-white mb-3 flex items-center gap-2"><span>🎖️</span> Достижения</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Первая победа", desc: "Выиграй первый бой", icon: "🏅", done: true },
                  { title: "Скоростной", desc: "10 побед подряд", icon: "💨", done: true },
                  { title: "Коллекционер", desc: "Собери 5 персонажей", icon: "📦", done: false },
                  { title: "Легенда", desc: "Достигни 100 уровня", icon: "👑", done: false },
                ].map(a => (
                  <div key={a.title} className="rounded-xl p-3" style={{ background: a.done ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${a.done ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                    <div className="text-2xl mb-1">{a.icon}</div>
                    <div className={`font-bold text-xs ${a.done ? "text-yellow-400" : "text-gray-500"}`}>{a.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">
              <span>⚡</span> События
            </div>
            {EVENTS.map(ev => (
              <div key={ev.id} className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className={`p-4 bg-gradient-to-r ${ev.color} relative`}>
                  <div className="absolute top-3 right-4 text-5xl opacity-30">{ev.emoji}</div>
                  <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-black mb-2 ${ev.status === "active" ? "bg-white/20 text-white" : "bg-yellow-400/30 text-yellow-200"}`}>
                    {ev.status === "active" ? "🟢 АКТИВНО" : "🟡 СКОРО"}
                  </div>
                  <div className="font-orbitron font-black text-white text-xl leading-tight">{ev.title}</div>
                  <div className="text-white/80 text-sm">{ev.subtitle}</div>
                </div>
                <div className="p-4" style={{ background: "rgba(10,0,30,0.85)" }}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-purple-300">⏰ {ev.timeLeft}</div>
                    <div className="text-xs text-cyan-400 font-bold">{ev.progress}% выполнено</div>
                  </div>
                  {ev.status === "active" && (
                    <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${ev.progress}%`, background: "linear-gradient(90deg,#7B2FFF,#00BFFF)" }} />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-yellow-400 font-bold">🎁 {ev.reward}</div>
                    <button className="px-4 py-1.5 rounded-xl text-xs font-black text-white transition-all"
                      style={{ background: ev.status === "active" ? "linear-gradient(90deg,#7B2FFF,#FF2F7B)" : "rgba(255,255,255,0.1)" }}>
                      {ev.status === "active" ? "Участвовать" : "Напомнить"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHARACTERS */}
        {activeTab === "characters" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-1">
              <span>⭐</span> Персонажи Соника
            </div>
            <img src={SONIC_TEAM} alt="Sonic Team" className="w-full h-36 object-cover rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              {CHARACTERS.map(c => (
                <div key={c.name} className="rounded-2xl p-3 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${c.owned ? c.color + "66" : "rgba(255,255,255,0.08)"}`, opacity: c.owned ? 1 : 0.6 }}>
                  {!c.owned && <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ background: "rgba(0,0,0,0.5)", zIndex: 2 }}><span className="text-2xl">🔒</span></div>}
                  <div className="text-4xl mb-2 text-center">{c.emoji}</div>
                  <div className="font-orbitron font-black text-white text-sm text-center">{c.name}</div>
                  <div className={`text-center text-xs font-bold mt-0.5 bg-gradient-to-r ${rarityColor[c.rarity]} bg-clip-text text-transparent`}>{c.rarity}</div>
                  <div className="text-xs text-purple-300 text-center">{c.role} · {c.element}</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-white mb-1"><span>Сила</span><span>{c.power}</span></div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${c.power}%`, background: `linear-gradient(90deg,${c.color},#FF69B4)` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHOP */}
        {activeTab === "shop" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4"><span>🛍️</span> Магазин</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Скин Неон", price: "500 💎", type: "Скин", emoji: "✨", hot: true },
                { name: "Шэдоу", price: "1200 💎", type: "Персонаж", emoji: "🌑", hot: false },
                { name: "Рамка Легенда", price: "300 💎", type: "Рамка", emoji: "👑", hot: false },
                { name: "XP x2 Буст", price: "200 💎", type: "Бустер", emoji: "⚡", hot: true },
                { name: "Блэйз", price: "1500 💎", type: "Персонаж", emoji: "🔥", hot: false },
                { name: "Эмодзи Пак", price: "150 💎", type: "Косметика", emoji: "😎", hot: false },
              ].map(item => (
                <div key={item.name} className="rounded-2xl p-3 relative" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {item.hot && <div className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full font-black text-white"
                    style={{ background: "linear-gradient(90deg,#FF2F7B,#FF6B35)" }}>ХИТ</div>}
                  <div className="text-3xl text-center mb-2">{item.emoji}</div>
                  <div className="font-bold text-white text-xs text-center">{item.name}</div>
                  <div className="text-xs text-purple-400 text-center mb-2">{item.type}</div>
                  <button className="w-full py-1.5 rounded-xl text-xs font-black text-white"
                    style={{ background: "linear-gradient(90deg,#7B2FFF,#FF2F7B)" }}>{item.price}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLANS */}
        {activeTab === "clans" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4"><span>🛡️</span> Кланы</div>
            {[
              { name: "Sonic Speeders", tag: "SSP", members: 48, maxMembers: 50, power: 92, emoji: "⚡", color: "#00BFFF" },
              { name: "Shadow Legion", tag: "SHL", members: 45, maxMembers: 50, power: 95, emoji: "🌑", color: "#9B30FF" },
              { name: "Rose Warriors", tag: "RWR", members: 32, maxMembers: 50, power: 78, emoji: "🌸", color: "#FF69B4" },
            ].map(clan => (
              <div key={clan.name} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${clan.color}44` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${clan.color}22` }}>{clan.emoji}</div>
                  <div>
                    <div className="font-orbitron font-black text-white">{clan.name}</div>
                    <div className="text-xs text-purple-300">[{clan.tag}] · {clan.members}/{clan.maxMembers} участников</div>
                  </div>
                  <div className="ml-auto">
                    <div className="font-orbitron font-black text-lg" style={{ color: clan.color }}>{clan.power}</div>
                    <div className="text-xs text-purple-400 text-right">сила</div>
                  </div>
                </div>
                <button className="w-full py-2 rounded-xl text-sm font-black text-white"
                  style={{ background: `linear-gradient(90deg,${clan.color}88,${clan.color}44)`, border: `1px solid ${clan.color}88` }}>
                  Вступить
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <div className="space-y-3 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4"><span>💬</span> Чат</div>
            <div className="space-y-3" style={{ maxHeight: "calc(100vh - 280px)", overflowY: "auto" }}>
              {[
                { user: "SonicBlaze", msg: "Кто хочет в рейд? ⚡", time: "14:32", avatar: "⚡", color: "#00BFFF" },
                { user: "ShadowX", msg: "Я буду топ-1 этого сезона!", time: "14:30", avatar: "🌑", color: "#9B30FF" },
                { user: "TailsFox", msg: "Помогите с турниром, не хватает участников", time: "14:28", avatar: "🦊", color: "#FFD700" },
                { user: "AmyRose99", msg: "Собираем клан! Приходите к нам 🌸", time: "14:25", avatar: "🌸", color: "#FF69B4" },
                { user: "KnucklesPro", msg: "Новое событие ОГОНЬ 🔥", time: "14:20", avatar: "💎", color: "#FF4500" },
              ].map((m, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                    style={{ background: `${m.color}33`, border: `1px solid ${m.color}66` }}>{m.avatar}</div>
                  <div className="flex-1 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold" style={{ color: m.color }}>{m.user}</span>
                      <span className="text-xs text-gray-500">{m.time}</span>
                    </div>
                    <div className="text-sm text-white">{m.msg}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input placeholder="Написать сообщение..." className="flex-1 px-4 py-2 rounded-xl text-sm text-white placeholder-purple-400 outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(180,100,255,0.3)" }} />
              <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>
                <Icon name="Send" size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4"><span>⚙️</span> Настройки</div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { label: "Уведомления", icon: "Bell", value: "Включены" },
                { label: "Звук", icon: "Volume2", value: "75%" },
                { label: "Язык", icon: "Globe", value: "Русский" },
                { label: "Качество графики", icon: "Monitor", value: "Высокое" },
                { label: "Тема", icon: "Moon", value: "Тёмная" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.07)" : "none", background: "rgba(255,255,255,0.04)" }}>
                  <Icon name={s.icon} size={18} className="text-purple-400" />
                  <span className="flex-1 text-white text-sm">{s.label}</span>
                  <span className="text-purple-300 text-sm">{s.value}</span>
                  <Icon name="ChevronRight" size={16} className="text-gray-500" />
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl text-sm font-black text-white"
              style={{ background: "rgba(255,50,50,0.2)", border: "1px solid rgba(255,50,50,0.4)" }}>
              🚪 Выйти из аккаунта
            </button>
          </div>
        )}
      </main>

      <style>{`
        @keyframes floatUp {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.9; }
        }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}