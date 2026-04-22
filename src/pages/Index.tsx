import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/70d76ec6-fc96-4f09-8985-191a142fc170.jpg";
const SONIC_HERO = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/3f9f33c7-491f-4a9c-a17e-713c0bf198cb.jpg";
const SONIC_TEAM = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/d9921e68-e78b-462d-af2c-5508d8e907c9.jpg";
const BATTLE_BG = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/af158661-1391-4f6b-93e5-1b5bc91c3538.jpg";

const IMG_GOJO    = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/e822a9e9-557d-403a-9af7-f657e6d987d7.jpg";
const IMG_DIO     = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/d5022c9f-ed1c-4661-a34c-05b1a23930d3.jpg";
const IMG_JOTARO  = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/7dc64b40-c888-46ac-8666-00c405f7a25f.jpg";
const IMG_NARUTO  = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/b13c3c84-9ddb-4b6b-9d75-04db5ecb35b5.jpg";
const IMG_GOKU    = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/ad3fa17f-3a51-4a54-9f0c-14cdc5e0fcb4.jpg";
const IMG_ICHIGO  = "https://cdn.poehali.dev/projects/069f83db-c8a2-4a80-a533-f69694715fe0/files/d84601ea-53b3-4101-a956-84f0819222ff.jpg";

const TABS = [
  { id: "home",       label: "Главная",    icon: "Home" },
  { id: "battle",     label: "Битва",      icon: "Swords" },
  { id: "rating",     label: "Рейтинг",   icon: "Trophy" },
  { id: "progress",   label: "Прогресс",  icon: "TrendingUp" },
  { id: "events",     label: "События",   icon: "Zap" },
  { id: "characters", label: "Персонажи", icon: "Star" },
  { id: "shop",       label: "Магазин",   icon: "ShoppingBag" },
  { id: "clans",      label: "Кланы",     icon: "Shield" },
  { id: "chat",       label: "Чат",       icon: "MessageCircle" },
  { id: "settings",   label: "Настройки", icon: "Settings" },
];

const PLAYERS = [
  { rank: 1, name: "SonicBlaze",   level: 99, xp: 98450, avatar: "⚡", char: "Соник",  badge: "🏆" },
  { rank: 2, name: "ShadowX",      level: 95, xp: 87200, avatar: "🌑", char: "Шэдоу",  badge: "🥈" },
  { rank: 3, name: "TailsFox",     level: 92, xp: 76800, avatar: "🦊", char: "Тейлз",  badge: "🥉" },
  { rank: 4, name: "GojoBoss",     level: 90, xp: 71000, avatar: "🔵", char: "Годжо",  badge: "⭐" },
  { rank: 5, name: "AmyRose99",    level: 88, xp: 65400, avatar: "🌸", char: "Эми",    badge: "⭐" },
  { rank: 6, name: "KnucklesPro",  level: 85, xp: 59300, avatar: "💎", char: "Наклз",  badge: "⭐" },
  { rank: 7, name: "NarutoKing",   level: 83, xp: 54100, avatar: "🌀", char: "Наруто", badge: "" },
  { rank: 8, name: "DioBrando",    level: 80, xp: 47800, avatar: "👑", char: "Дио",    badge: "" },
];

interface Character {
  id: string;
  name: string;
  series: string;
  role: string;
  element: string;
  rarity: string;
  color: string;
  emoji: string;
  power: number;
  hp: number;
  attack: number;
  speed: number;
  img: string;
  owned: boolean;
  moves: string[];
}

const ALL_CHARACTERS: Character[] = [
  // Соник-персонажи
  { id: "sonic",   name: "Соник",   series: "Sonic",    role: "Скорость", element: "Молния",   rarity: "Легендарный", color: "#00BFFF", emoji: "⚡", power: 98, hp: 950, attack: 88, speed: 100, img: SONIC_HERO, owned: true,  moves: ["Спин-дэш", "Супер-Соник", "Кольца силы"] },
  { id: "shadow",  name: "Шэдоу",   series: "Sonic",    role: "Атака",    element: "Тьма",     rarity: "Легендарный", color: "#9B30FF", emoji: "🌑", power: 96, hp: 900, attack: 95, speed: 97,  img: SONIC_TEAM, owned: true,  moves: ["Хаос-контроль", "Хаос-удар", "Кровавый хаос"] },
  { id: "tails",   name: "Тейлз",   series: "Sonic",    role: "Поддержка",element: "Механика", rarity: "Эпический",   color: "#FFD700", emoji: "🦊", power: 85, hp: 800, attack: 75, speed: 85,  img: SONIC_TEAM, owned: true,  moves: ["Хвостовой вихрь", "Ракета", "Электро-щит"] },
  { id: "amy",     name: "Эми",     series: "Sonic",    role: "Целитель", element: "Любовь",   rarity: "Редкий",      color: "#FF69B4", emoji: "🌸", power: 79, hp: 750, attack: 72, speed: 75,  img: SONIC_TEAM, owned: false, moves: ["Розовый молот", "Любовный удар", "Пика-удар"] },
  { id: "knuckles",name: "Наклз",   series: "Sonic",    role: "Защита",   element: "Земля",    rarity: "Эпический",   color: "#FF4500", emoji: "💎", power: 91, hp: 1000,attack: 91, speed: 70,  img: SONIC_TEAM, owned: false, moves: ["Дробящий удар", "Земляной кулак", "Изумруд"] },
  { id: "blaze",   name: "Блэйз",   series: "Sonic",    role: "Маг",      element: "Огонь",    rarity: "Легендарный", color: "#FF6347", emoji: "🔥", power: 94, hp: 870, attack: 94, speed: 92,  img: SONIC_TEAM, owned: false, moves: ["Огненный удар", "Пламенный смерч", "Огнешар"] },
  // Аниме-персонажи
  { id: "gojo",    name: "Годжо",   series: "JJK",      role: "Маг",      element: "Бесконечность", rarity: "Легендарный", color: "#00F5FF", emoji: "🔵", power: 99, hp: 1000,attack: 99, speed: 95,  img: IMG_GOJO,   owned: true,  moves: ["Пустота", "Красный", "Фиолетовый"] },
  { id: "dio",     name: "Дио",     series: "JoJo",     role: "Злодей",   element: "Время",    rarity: "Легендарный", color: "#FFD700", emoji: "👑", power: 97, hp: 980, attack: 97, speed: 90,  img: IMG_DIO,    owned: true,  moves:["Муда-муда", "Роудроллер", "Стоп-время"] },
  { id: "jotaro",  name: "Джотаро", series: "JoJo",     role: "Боец",     element: "Звезда",   rarity: "Легендарный", color: "#6A5ACD", emoji: "⭐", power: 95, hp: 950, attack: 95, speed: 88,  img: IMG_JOTARO, owned: true,  moves:["Ора-ора-ора", "Стар Платинум", "Остановка"] },
  { id: "naruto",  name: "Наруто",  series: "Naruto",   role: "Ниндзя",   element: "Ветер",    rarity: "Легендарный", color: "#FF8C00", emoji: "🌀", power: 96, hp: 970, attack: 93, speed: 94,  img: IMG_NARUTO, owned: true,  moves: ["Расенган", "Клон Наруто", "9-хвостый"] },
  { id: "goku",    name: "Гоку",    series: "DBZ",      role: "Боец",     element: "Ки",       rarity: "Легендарный", color: "#4169E1", emoji: "🔆", power: 100,hp: 1000,attack: 100,speed: 98,  img: IMG_GOKU,   owned: false, moves: ["Камехамеха", "Ультра-инстинкт", "ССБ-удар"] },
  { id: "ichigo",  name: "Ичиго",   series: "Bleach",   role: "Синигами", element: "Дух",      rarity: "Легендарный", color: "#DC143C", emoji: "⚔️", power: 95, hp: 960, attack: 96, speed: 91,  img: IMG_ICHIGO, owned: false, moves:["Гэцуга тэнсё", "Банкай", "Финал"] },
];

const EVENTS = [
  { id: 1, title: "ТУРНИР СКОРОСТИ",  subtitle: "Sonic Speed Cup",   timeLeft: "2д 14ч 33м", reward: "5000 XP + Скин Соник",        status: "active", color: "from-blue-500 to-cyan-400",     emoji: "⚡", progress: 65 },
  { id: 2, title: "ТЁМНАЯ АРЕНА",     subtitle: "Shadow's Revenge",  timeLeft: "5д 8ч 12м",  reward: "8000 XP + Персонаж Шэдоу",    status: "active", color: "from-purple-600 to-pink-500",   emoji: "🌑", progress: 30 },
  { id: 3, title: "ПРАЗДНИК ХАОСА",   subtitle: "Chaos Festival",    timeLeft: "Завтра 00:00",reward: "Изумруд Хаоса",               status: "soon",   color: "from-yellow-400 to-orange-500", emoji: "💎", progress: 0  },
];

const PASS_TIERS = [
  { level: 1,  reward: "100 монет",           done: true  },
  { level: 5,  reward: "Рамка профиля",        done: true  },
  { level: 10, reward: "Скин «Неон»",          done: true  },
  { level: 20, reward: "Персонаж Тейлз",       done: false },
  { level: 30, reward: "Изумруд Хаоса",        done: false },
  { level: 50, reward: "Легендарный Шэдоу",    done: false },
];

const rarityColor: Record<string, string> = {
  "Легендарный": "from-yellow-400 to-orange-500",
  "Эпический":   "from-purple-500 to-pink-500",
  "Редкий":      "from-blue-400 to-cyan-400",
};

interface ChatMsg { user: string; msg: string; time: string; avatar: string; color: string; }

const INIT_CHAT: ChatMsg[] = [
  { user: "SonicBlaze",  msg: "Кто хочет в рейд? ⚡",                            time: "14:32", avatar: "⚡", color: "#00BFFF" },
  { user: "GojoBoss",    msg: "Я только что победил Гоку в битве 🔵",             time: "14:31", avatar: "🔵", color: "#00F5FF" },
  { user: "ShadowX",     msg: "Я буду топ-1 этого сезона!",                       time: "14:30", avatar: "🌑", color: "#9B30FF" },
  { user: "DioBrando",   msg: "МУДАМУДАМУДА! Никто не сравнится с Дио 👑",         time: "14:28", avatar: "👑", color: "#FFD700" },
  { user: "NarutoKing",  msg: "Дattebayo! Расенган всех снесёт 🌀",                time: "14:25", avatar: "🌀", color: "#FF8C00" },
];

// ─── Battle state types ───
type BattlePhase = "select" | "vs" | "fight" | "result";

export default function Index() {
  const [activeTab, setActiveTab]     = useState("home");
  const [xp, setXp]                   = useState(12450);
  const [level]                        = useState(23);
  const [particles, setParticles]     = useState<{ id: number; x: number; y: number; size: number; speed: number; hue: number }[]>([]);

  // Chat
  const [chatMsgs, setChatMsgs]       = useState<ChatMsg[]>(INIT_CHAT);
  const [chatInput, setChatInput]     = useState("");
  const chatEndRef                     = useRef<HTMLDivElement>(null);

  // Battle
  const [battlePhase, setBattlePhase] = useState<BattlePhase>("select");
  const [myChar, setMyChar]           = useState<Character | null>(null);
  const [enemyChar, setEnemyChar]     = useState<Character | null>(null);
  const [myHp, setMyHp]               = useState(0);
  const [enemyHp, setEnemyHp]         = useState(0);
  const [myMaxHp, setMyMaxHp]         = useState(0);
  const [enemyMaxHp, setEnemyMaxHp]   = useState(0);
  const [battleLog, setBattleLog]     = useState<string[]>([]);
  const [battleResult, setBattleResult] = useState<"win" | "lose" | null>(null);
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [shakeEnemy, setShakeEnemy]   = useState(false);
  const [shakeMe, setShakeMe]         = useState(false);
  const [vsAnim, setVsAnim]           = useState(false);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs]);

  const xpPercent = Math.round((xp % 5000) / 50);
  const xpToNext  = 5000 - (xp % 5000);

  // ─── Chat send ───
  const sendChat = () => {
    const txt = chatInput.trim();
    if (!txt) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setChatMsgs(prev => [...prev, { user: "Ты", msg: txt, time, avatar: "🎮", color: "#FF69B4" }]);
    setChatInput("");
  };

  // ─── Battle logic ───
  const startBattle = (me: Character) => {
    const enemies = ALL_CHARACTERS.filter(c => c.id !== me.id);
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    setMyChar(me);
    setEnemyChar(enemy);
    setMyHp(me.hp);
    setEnemyHp(enemy.hp);
    setMyMaxHp(me.hp);
    setEnemyMaxHp(enemy.hp);
    setBattleLog([`⚔️ Бой начался! ${me.name} VS ${enemy.name}!`]);
    setBattleResult(null);
    setSelectedMove(null);
    setBattlePhase("vs");
    setVsAnim(true);
    setTimeout(() => { setVsAnim(false); setBattlePhase("fight"); }, 2200);
  };

  const doMove = (move: string) => {
    if (!myChar || !enemyChar || battleResult) return;
    setSelectedMove(move);

    const myDmg   = Math.floor(myChar.attack * (0.7 + Math.random() * 0.6));
    const enDmg   = Math.floor(enemyChar.attack * (0.5 + Math.random() * 0.5));

    setShakeEnemy(true);
    setTimeout(() => setShakeEnemy(false), 400);

    const newEnemyHp = Math.max(0, enemyHp - myDmg);
    setEnemyHp(newEnemyHp);

    if (newEnemyHp <= 0) {
      setBattleLog(prev => [...prev, `💥 ${myChar.name} применил «${move}» — ${myDmg} урона!`, `🏆 ПОБЕДА! ${myChar.name} победил!`]);
      setBattleResult("win");
      setXp(prev => prev + 800);
      return;
    }

    // Enemy turn
    setTimeout(() => {
      const enMove = enemyChar.moves[Math.floor(Math.random() * enemyChar.moves.length)];
      setShakeMe(true);
      setTimeout(() => setShakeMe(false), 400);
      const newMyHp = Math.max(0, myHp - enDmg);
      setMyHp(newMyHp);
      setBattleLog(prev => [
        ...prev,
        `💥 ${myChar.name} применил «${move}» — ${myDmg} урона!`,
        `🔥 ${enemyChar.name} ответил «${enMove}» — ${enDmg} урона!`,
      ]);
      if (newMyHp <= 0) {
        setBattleLog(prev => [...prev, `💀 Поражение... ${enemyChar.name} победил.`]);
        setBattleResult("lose");
      }
      setSelectedMove(null);
    }, 600);
  };

  const resetBattle = () => {
    setBattlePhase("select");
    setMyChar(null);
    setEnemyChar(null);
    setBattleLog([]);
    setBattleResult(null);
  };

  const ownedChars = ALL_CHARACTERS.filter(c => c.owned);

  return (
    <div className="min-h-screen font-nunito overflow-x-hidden" style={{ background: "#0a0015" }}>
      {/* Animated BG */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(120,0,255,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,200,255,0.25) 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(255,0,150,0.2) 0%, transparent 60%)" }} />
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full opacity-60" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: `hsl(${p.hue}, 100%, 70%)`,
            boxShadow: `0 0 ${p.size * 3}px hsl(${p.hue}, 100%, 70%)`,
            animation: `floatUp ${p.speed}s ease-in-out infinite`,
            animationDelay: `${-Math.random() * p.speed}s`,
          }} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-3" style={{ background: "rgba(10,0,30,0.85)", borderBottom: "1px solid rgba(180,100,255,0.3)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-orbitron font-black text-xl" style={{ background: "linear-gradient(90deg,#00BFFF,#FF69B4,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AniQuest</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-yellow-300" style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}>
            <span>💎</span><span>4,820</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-cyan-300" style={{ background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.4)" }}>
            <span>⚡</span><span>Ур.{level}</span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>⚡</div>
        </div>
      </header>

      {/* Nav */}
      <nav className="relative z-20 flex overflow-x-auto gap-1 px-3 py-2 no-scrollbar" style={{ background: "rgba(10,0,30,0.7)", borderBottom: "1px solid rgba(120,0,255,0.2)" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200"
            style={activeTab === tab.id
              ? { background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)", color: "#fff", boxShadow: "0 0 15px rgba(120,47,255,0.7)" }
              : { color: "rgba(200,180,255,0.7)", background: "rgba(255,255,255,0.05)" }}>
            <Icon name={tab.icon} size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="relative z-10 pb-6 px-3 pt-4">

        {/* ═══ HOME ═══ */}
        {activeTab === "home" && (
          <div className="space-y-4 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={SONIC_HERO} alt="Sonic" className="w-full h-52 object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,0,30,0.95) 0%, rgba(10,0,30,0.4) 50%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Добро пожаловать, Герой!</div>
                <h2 className="font-orbitron font-black text-2xl text-white leading-tight">МИР<br />
                  <span style={{ background: "linear-gradient(90deg,#00BFFF,#FF69B4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>АНИМЕ & СОНИК</span>
                </h2>
              </div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: "linear-gradient(90deg,#FF2F7B,#FF6B35)", boxShadow: "0 0 12px rgba(255,47,123,0.7)" }}>🔥 ГОРЯЧО</div>
            </div>

            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(180,100,255,0.25)", backdropFilter: "blur(10px)" }}>
              <div className="flex justify-between items-center mb-2">
                <div><span className="font-orbitron font-black text-white text-lg">Уровень {level}</span><span className="text-purple-400 text-sm ml-2">SonicFan</span></div>
                <span className="text-cyan-400 text-sm font-bold">{xpToNext} XP до след.</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${xpPercent}%`, background: "linear-gradient(90deg,#7B2FFF,#00BFFF,#FF2F7B)", boxShadow: "0 0 10px rgba(0,191,255,0.7)" }} />
              </div>
              <div className="flex justify-between text-xs text-purple-400 mt-1"><span>{xp.toLocaleString()} XP</span><span>{xpPercent}%</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Победы",  value: "247",  icon: "Trophy", color: "#FFD700" },
                { label: "Серия",   value: "12🔥", icon: "Zap",    color: "#00BFFF" },
                { label: "Ранг",    value: "#4",   icon: "Star",   color: "#FF69B4" },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon name={s.icon} size={20} className="mx-auto mb-1" style={{ color: s.color }} />
                  <div className="font-orbitron font-black text-lg text-white">{s.value}</div>
                  <div className="text-xs text-purple-300">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setActiveTab("battle")} className="w-full py-4 rounded-2xl font-orbitron font-black text-white text-lg relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#FF2F7B,#7B2FFF,#00BFFF)", boxShadow: "0 0 30px rgba(120,47,255,0.6)" }}>
              <span className="relative z-10">⚔️ В БОЙ!</span>
            </button>

            <div className="rounded-2xl overflow-hidden">
              <img src={SONIC_TEAM} alt="Sonic Team" className="w-full h-36 object-cover" />
              <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,100,255,0.2)" }}>
                <div className="font-bold text-white text-sm">Соник + Аниме-мир</div>
                <div className="text-xs text-purple-300">Соник, Годжо, Дио, Джотаро, Наруто, Гоку, Ичиго и другие ✨</div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ BATTLE ═══ */}
        {activeTab === "battle" && (
          <div className="animate-fade-in">

            {/* SELECT FIGHTER */}
            {battlePhase === "select" && (
              <div className="space-y-4">
                <div className="font-orbitron font-black text-white text-xl flex items-center gap-2">⚔️ Выбери бойца</div>
                <p className="text-purple-300 text-sm">Выбери персонажа — враг выбирается автоматически!</p>
                <div className="grid grid-cols-2 gap-3">
                  {ownedChars.map(c => (
                    <button key={c.id} onClick={() => startBattle(c)}
                      className="rounded-2xl overflow-hidden text-left transition-all hover:scale-105 active:scale-95"
                      style={{ border: `2px solid ${c.color}88`, background: "rgba(255,255,255,0.04)" }}>
                      <img src={c.img} alt={c.name} className="w-full h-32 object-cover object-top" />
                      <div className="p-2">
                        <div className="font-orbitron font-black text-white text-sm">{c.emoji} {c.name}</div>
                        <div className="text-xs text-purple-300">{c.series || "Sonic"} · Сила {c.power}</div>
                        <div className="flex gap-1 mt-1">
                          <div className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${c.color}33`, color: c.color }}>❤️ {c.hp}</div>
                          <div className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,100,0,0.2)", color: "#FF8C00" }}>⚔️ {c.attack}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VS SCREEN */}
            {battlePhase === "vs" && myChar && enemyChar && (
              <div className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center min-h-64" style={{ minHeight: 300 }}>
                <img src={BATTLE_BG} alt="battle" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
                <div className={`relative z-10 flex items-center gap-6 transition-all duration-700 ${vsAnim ? "scale-110" : "scale-100"}`}>
                  <div className="text-center">
                    <img src={myChar.img} className="w-24 h-24 object-cover rounded-full border-4" style={{ borderColor: myChar.color }} alt={myChar.name} />
                    <div className="font-orbitron font-black text-white mt-1">{myChar.name}</div>
                  </div>
                  <div className="font-orbitron font-black text-5xl text-white" style={{
                    textShadow: "0 0 30px #FF2F7B, 0 0 60px #7B2FFF",
                    animation: vsAnim ? "vsFlash 0.5s ease-in-out infinite" : "none"
                  }}>VS</div>
                  <div className="text-center">
                    <img src={enemyChar.img} className="w-24 h-24 object-cover rounded-full border-4" style={{ borderColor: enemyChar.color }} alt={enemyChar.name} />
                    <div className="font-orbitron font-black text-white mt-1">{enemyChar.name}</div>
                  </div>
                </div>
              </div>
            )}

            {/* FIGHT SCREEN */}
            {battlePhase === "fight" && myChar && enemyChar && (
              <div className="space-y-3">
                {/* Arena */}
                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 200 }}>
                  <img src={BATTLE_BG} alt="arena" className="w-full h-52 object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(10,0,30,0.8) 100%)" }} />

                  {/* Fighters */}
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                    <div className={`flex flex-col items-center transition-transform duration-200 ${shakeMe ? "-translate-x-2" : ""}`}>
                      <img src={myChar.img} alt={myChar.name} className="w-20 h-20 object-cover object-top rounded-xl border-2" style={{ borderColor: myChar.color, boxShadow: `0 0 15px ${myChar.color}` }} />
                      <div className="font-orbitron font-black text-white text-xs mt-1">{myChar.emoji} {myChar.name}</div>
                    </div>
                    <div className="font-orbitron font-black text-white text-2xl" style={{ textShadow: "0 0 20px #FF2F7B" }}>VS</div>
                    <div className={`flex flex-col items-center transition-transform duration-200 ${shakeEnemy ? "translate-x-2" : ""}`}>
                      <img src={enemyChar.img} alt={enemyChar.name} className="w-20 h-20 object-cover object-top rounded-xl border-2" style={{ borderColor: enemyChar.color, boxShadow: `0 0 15px ${enemyChar.color}` }} />
                      <div className="font-orbitron font-black text-white text-xs mt-1">{enemyChar.emoji} {enemyChar.name}</div>
                    </div>
                  </div>
                </div>

                {/* HP Bars */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${myChar.color}66` }}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-white">{myChar.name}</span>
                      <span style={{ color: myChar.color }}>{myHp}/{myMaxHp}</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(myHp / myMaxHp) * 100}%`, background: `linear-gradient(90deg, ${myChar.color}, #00FF88)` }} />
                    </div>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${enemyChar.color}66` }}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-white">{enemyChar.name}</span>
                      <span style={{ color: enemyChar.color }}>{enemyHp}/{enemyMaxHp}</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(enemyHp / enemyMaxHp) * 100}%`, background: `linear-gradient(90deg, ${enemyChar.color}, #FF3366)` }} />
                    </div>
                  </div>
                </div>

                {/* Battle log */}
                <div className="rounded-xl p-3 space-y-1" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)", maxHeight: 100, overflowY: "auto" }}>
                  {battleLog.slice(-4).map((log, i) => (
                    <div key={i} className="text-xs text-purple-200">{log}</div>
                  ))}
                </div>

                {/* Result */}
                {battleResult && (
                  <div className="rounded-2xl p-6 text-center" style={{ background: battleResult === "win" ? "rgba(0,255,100,0.15)" : "rgba(255,0,50,0.15)", border: `2px solid ${battleResult === "win" ? "#00FF88" : "#FF3366"}` }}>
                    <div className="text-5xl mb-2">{battleResult === "win" ? "🏆" : "💀"}</div>
                    <div className="font-orbitron font-black text-2xl text-white mb-1">{battleResult === "win" ? "ПОБЕДА!" : "ПОРАЖЕНИЕ"}</div>
                    {battleResult === "win" && <div className="text-green-400 font-bold text-sm mb-3">+800 XP получено!</div>}
                    <div className="flex gap-2 justify-center">
                      <button onClick={resetBattle} className="px-5 py-2 rounded-xl font-black text-white text-sm" style={{ background: "linear-gradient(90deg,#7B2FFF,#FF2F7B)" }}>Ещё раз</button>
                      <button onClick={() => { resetBattle(); setActiveTab("characters"); }} className="px-5 py-2 rounded-xl font-black text-white text-sm" style={{ background: "rgba(255,255,255,0.1)" }}>Сменить бойца</button>
                    </div>
                  </div>
                )}

                {/* Move buttons */}
                {!battleResult && (
                  <div>
                    <div className="text-xs text-purple-400 font-bold mb-2 uppercase tracking-wider">Выбери атаку:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {myChar.moves.map(move => (
                        <button key={move} onClick={() => doMove(move)} disabled={!!selectedMove}
                          className="py-3 px-2 rounded-xl text-xs font-black text-white text-center transition-all active:scale-95 disabled:opacity-50"
                          style={{ background: "linear-gradient(135deg,#7B2FFF88,#FF2F7B88)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 0 10px rgba(120,47,255,0.4)" }}>
                          {move}
                        </button>
                      ))}
                    </div>
                    <button onClick={resetBattle} className="w-full mt-3 py-2 rounded-xl text-xs font-bold text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>
                      ← Сдаться
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══ RATING ═══ */}
        {activeTab === "rating" && (
          <div className="space-y-3 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">🏆 Топ Игроков</div>
            <div className="flex items-end justify-center gap-3 mb-6 px-2">
              {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((p, i) => {
                const heights = ["h-20", "h-28", "h-16"];
                const colors  = ["from-gray-400 to-gray-300", "from-yellow-400 to-orange-400", "from-orange-400 to-yellow-600"];
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
            {PLAYERS.map((p, idx) => (
              <div key={p.rank} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: idx === 0 ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${idx === 0 ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)"}` }}>
                <div className="font-orbitron font-black text-lg w-6 text-center" style={{ color: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "#888" }}>{p.rank}</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>{p.avatar}</div>
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

        {/* ═══ PROGRESS ═══ */}
        {activeTab === "progress" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">📈 Прогрессия</div>
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,rgba(123,47,255,0.4),rgba(0,191,255,0.3))", border: "1px solid rgba(120,100,255,0.4)" }}>
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">⚡</div>
                <div className="font-orbitron font-black text-4xl text-white">{level}</div>
                <div className="text-purple-300 text-sm">текущий уровень</div>
              </div>
              <div className="h-4 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full rounded-full" style={{ width: `${xpPercent}%`, background: "linear-gradient(90deg,#7B2FFF,#00BFFF,#FF2F7B)", boxShadow: "0 0 12px rgba(0,191,255,0.9)" }} />
              </div>
              <div className="flex justify-between text-sm text-white font-bold">
                <span>{xp.toLocaleString()} XP</span><span>{(Math.ceil(xp / 5000) * 5000).toLocaleString()} XP</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,215,0,0.4)" }}>
              <div className="p-3 flex items-center justify-between" style={{ background: "linear-gradient(90deg,rgba(255,150,0,0.4),rgba(255,50,150,0.3))" }}>
                <div className="font-orbitron font-black text-white">⚔️ Боевой Пропуск</div>
                <div className="text-xs px-2 py-1 rounded-full font-bold text-yellow-300" style={{ background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.5)" }}>СЕЗОН 1</div>
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
            <div>
              <div className="font-bold text-white mb-3 flex items-center gap-2">🎖️ Достижения</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Первая победа",  desc: "Выиграй первый бой",      icon: "🏅", done: true  },
                  { title: "Скоростной",     desc: "10 побед подряд",         icon: "💨", done: true  },
                  { title: "Коллекционер",   desc: "Собери 5 персонажей",     icon: "📦", done: false },
                  { title: "Легенда",        desc: "Достигни 100 уровня",     icon: "👑", done: false },
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

        {/* ═══ EVENTS ═══ */}
        {activeTab === "events" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">⚡ События</div>
            {EVENTS.map(ev => (
              <div key={ev.id} className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
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
                    <button className="px-4 py-1.5 rounded-xl text-xs font-black text-white" style={{ background: ev.status === "active" ? "linear-gradient(90deg,#7B2FFF,#FF2F7B)" : "rgba(255,255,255,0.1)" }}>
                      {ev.status === "active" ? "Участвовать" : "Напомнить"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ CHARACTERS ═══ */}
        {activeTab === "characters" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2">⭐ Все Персонажи</div>
            <p className="text-purple-300 text-xs">Соник, Шэдоу и аниме-герои в одном месте!</p>

            {/* Sonic section */}
            <div className="text-xs font-black text-cyan-400 uppercase tracking-widest mt-2">⚡ Соник-персонажи</div>
            <div className="grid grid-cols-2 gap-3">
              {ALL_CHARACTERS.filter(c => c.series === "Sonic").map(c => (
                <CharCard key={c.id} c={c} onFight={() => { startBattle(c); setActiveTab("battle"); }} />
              ))}
            </div>

            {/* Anime section */}
            <div className="text-xs font-black text-pink-400 uppercase tracking-widest mt-2">🎌 Аниме-персонажи</div>
            <div className="grid grid-cols-2 gap-3">
              {ALL_CHARACTERS.filter(c => c.series !== "Sonic").map(c => (
                <CharCard key={c.id} c={c} onFight={() => { startBattle(c); setActiveTab("battle"); }} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ SHOP ═══ */}
        {activeTab === "shop" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">🛍️ Магазин</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Скин Неон",      price: "500 💎",  type: "Скин",      emoji: "✨", hot: true  },
                { name: "Годжо",          price: "1200 💎", type: "Персонаж",  emoji: "🔵", hot: true  },
                { name: "Рамка Легенда",  price: "300 💎",  type: "Рамка",     emoji: "👑", hot: false },
                { name: "XP x2 Буст",    price: "200 💎",  type: "Бустер",    emoji: "⚡", hot: true  },
                { name: "Гоку",          price: "1500 💎", type: "Персонаж",  emoji: "🔆", hot: false },
                { name: "Ичиго",         price: "1400 💎", type: "Персонаж",  emoji: "⚔️", hot: false },
              ].map(item => (
                <div key={item.name} className="rounded-2xl p-3 relative" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {item.hot && <div className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full font-black text-white" style={{ background: "linear-gradient(90deg,#FF2F7B,#FF6B35)" }}>ХИТ</div>}
                  <div className="text-3xl text-center mb-2">{item.emoji}</div>
                  <div className="font-bold text-white text-xs text-center">{item.name}</div>
                  <div className="text-xs text-purple-400 text-center mb-2">{item.type}</div>
                  <button className="w-full py-1.5 rounded-xl text-xs font-black text-white" style={{ background: "linear-gradient(90deg,#7B2FFF,#FF2F7B)" }}>{item.price}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CLANS ═══ */}
        {activeTab === "clans" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">🛡️ Кланы</div>
            {[
              { name: "Sonic Speeders",  tag: "SSP", members: 48, maxMembers: 50, power: 92, emoji: "⚡", color: "#00BFFF" },
              { name: "Shadow Legion",   tag: "SHL", members: 45, maxMembers: 50, power: 95, emoji: "🌑", color: "#9B30FF" },
              { name: "Anime Alliance", tag: "ANM", members: 40, maxMembers: 50, power: 98, emoji: "🎌", color: "#FF69B4" },
              { name: "Rose Warriors",   tag: "RWR", members: 32, maxMembers: 50, power: 78, emoji: "🌸", color: "#FF4500" },
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
                <button className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: `linear-gradient(90deg,${clan.color}88,${clan.color}44)`, border: `1px solid ${clan.color}88` }}>
                  Вступить
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ═══ CHAT ═══ */}
        {activeTab === "chat" && (
          <div className="flex flex-col animate-fade-in" style={{ height: "calc(100vh - 200px)" }}>
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-3">💬 Чат</div>
            <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
              {chatMsgs.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.user === "Ты" ? "flex-row-reverse" : ""}`}>
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg" style={{ background: `${m.color}33`, border: `1px solid ${m.color}66` }}>{m.avatar}</div>
                  <div className={`max-w-[70%] rounded-xl px-3 py-2 ${m.user === "Ты" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                    style={{ background: m.user === "Ты" ? "linear-gradient(135deg,#7B2FFF,#FF2F7B)" : "rgba(255,255,255,0.08)" }}>
                    <div className="flex justify-between items-center mb-0.5 gap-3">
                      <span className="text-xs font-bold" style={{ color: m.user === "Ты" ? "#fff" : m.color }}>{m.user}</span>
                      <span className="text-xs text-gray-500">{m.time}</span>
                    </div>
                    <div className="text-sm text-white">{m.msg}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2 rounded-xl text-sm text-white placeholder-purple-400 outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(180,100,255,0.3)" }}
              />
              <button onClick={sendChat} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#7B2FFF,#FF2F7B)" }}>
                <Icon name="Send" size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ═══ SETTINGS ═══ */}
        {activeTab === "settings" && (
          <div className="space-y-4 animate-fade-in">
            <div className="font-orbitron font-black text-white text-xl flex items-center gap-2 mb-4">⚙️ Настройки</div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { label: "Уведомления",      icon: "Bell",    value: "Включены" },
                { label: "Звук",             icon: "Volume2", value: "75%"      },
                { label: "Язык",             icon: "Globe",   value: "Русский"  },
                { label: "Качество графики", icon: "Monitor", value: "Высокое"  },
                { label: "Тема",             icon: "Moon",    value: "Тёмная"   },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.07)" : "none", background: "rgba(255,255,255,0.04)" }}>
                  <Icon name={s.icon} size={18} className="text-purple-400" />
                  <span className="flex-1 text-white text-sm">{s.label}</span>
                  <span className="text-purple-300 text-sm">{s.value}</span>
                  <Icon name="ChevronRight" size={16} className="text-gray-500" />
                </div>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl text-sm font-black text-white" style={{ background: "rgba(255,50,50,0.2)", border: "1px solid rgba(255,50,50,0.4)" }}>
              🚪 Выйти из аккаунта
            </button>
          </div>
        )}
      </main>

      <style>{`
        @keyframes floatUp { 0%,100%{transform:translateY(0) scale(1);opacity:.6} 50%{transform:translateY(-30px) scale(1.2);opacity:.9} }
        @keyframes vsFlash { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.15)} }
        @keyframes fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .animate-fade-in { animation: fade-in .3s ease-out; }
        .font-orbitron { font-family:'Orbitron',sans-serif; }
        .font-nunito   { font-family:'Nunito',sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar  { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>
    </div>
  );
}

// Reusable character card
function CharCard({ c, onFight }: { c: Character; onFight: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${c.owned ? c.color + "66" : "rgba(255,255,255,0.08)"}`, opacity: c.owned ? 1 : 0.65 }}>
      {!c.owned && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-10" style={{ background: "rgba(0,0,0,0.55)" }}>
          <span className="text-3xl">🔒</span>
        </div>
      )}
      <img src={c.img} alt={c.name} className="w-full h-28 object-cover object-top" />
      <div className="p-2">
        <div className="font-orbitron font-black text-white text-xs">{c.emoji} {c.name}</div>
        <div className={`text-xs font-bold bg-gradient-to-r ${rarityColor[c.rarity]} bg-clip-text text-transparent`}>{c.rarity}</div>
        <div className="text-xs text-purple-300">{c.series} · {c.role}</div>
        <div className="mt-1.5 mb-1">
          <div className="flex justify-between text-xs text-white mb-0.5"><span>Сила</span><span>{c.power}</span></div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: `${c.power}%`, background: `linear-gradient(90deg,${c.color},#FF69B4)` }} />
          </div>
        </div>
        {c.owned && (
          <button onClick={onFight} className="w-full py-1.5 rounded-lg text-xs font-black text-white mt-1" style={{ background: "linear-gradient(90deg,#7B2FFF,#FF2F7B)" }}>
            ⚔️ В бой!
          </button>
        )}
      </div>
    </div>
  );
}
