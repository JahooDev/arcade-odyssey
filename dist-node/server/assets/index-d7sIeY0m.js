import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, createContext, useContext, useRef } from "react";
const translations = {
  en: {
    pressStart: "Press Start",
    insertCoin: "Insert Coin to Begin",
    arcadeMode: "Arcade Experience",
    arcadeModeDesc: "Play mini-games to unlock skills",
    recruiterMode: "Recruiter Mode",
    recruiterModeDesc: "Instant access — skip the games",
    achievements: "Achievements",
    unlocked: "Unlocked",
    locked: "Locked",
    progression: "Player Progression",
    selectGame: "Select a Game",
    play: "Play",
    skip: "Skip",
    backToHub: "Back to Hub",
    projects: "Projects",
    aboutMe: "About Me",
    contact: "Contact",
    skills: "Skills & Tech",
    aboutText: "Junior Unity game developer with a passion for crafting immersive experiences. I build games, mobile apps, and full-stack web — fluent in C#, JavaScript, and a love for retro aesthetics.",
    heroTitle: "ARCADE.DEV",
    heroSubtitle: "An Interactive Portfolio",
    heroTagline: "Junior Unity Developer · Full-Stack Builder",
    flipCard: "Click to flip",
    completed: "Completed!",
    youWin: "You Win!",
    tryAgain: "Try again",
    rewardUnlocked: "ACHIEVEMENT UNLOCKED",
    games: {
      tictactoe: "Tic Tac Toe",
      memory: "Memory Match",
      snake: "Mini Snake",
      breakout: "Brick Breaker",
      whack: "Whac-a-Bug",
      reaction: "Reaction Test"
    },
    description: "DESCRIPTION",
    experience: "EXPERIENCE",
    relatedProjects: "RELATED PROJECTS",
    contactCta: "Let's build something legendary.",
    sendEmail: "Send Email",
    viewGithub: "View GitHub",
    terminalHint: "Try 'help', 'recruiter', 'reset', 'status'",
    of: "of",
    resetProgress: "Reset Progress",
    resetConfirm: "Reset all progress?",
    progressReset: "Progress reset — fresh start!"
  },
  fr: {
    pressStart: "Appuyez sur Start",
    insertCoin: "Insérez une pièce pour commencer",
    arcadeMode: "Expérience Arcade",
    arcadeModeDesc: "Jouez aux mini-jeux pour débloquer les compétences",
    recruiterMode: "Mode Recruteur",
    recruiterModeDesc: "Accès instantané — sans les jeux",
    achievements: "Succès",
    unlocked: "Débloqué",
    locked: "Verrouillé",
    progression: "Progression du Joueur",
    selectGame: "Choisir un jeu",
    play: "Jouer",
    skip: "Passer",
    backToHub: "Retour au Hub",
    projects: "Projets",
    aboutMe: "À propos",
    contact: "Contact",
    skills: "Compétences & Techno",
    aboutText: "Développeur Unity junior passionné par les expériences immersives. Je conçois des jeux, des apps mobiles et du full-stack web — fluide en C#, JavaScript, et amoureux du rétro.",
    heroTitle: "ARCADE.DEV",
    heroSubtitle: "Un Portfolio Interactif",
    heroTagline: "Développeur Unity Junior · Full-Stack",
    flipCard: "Cliquez pour retourner",
    completed: "Terminé !",
    youWin: "Gagné !",
    tryAgain: "Réessayer",
    rewardUnlocked: "SUCCÈS DÉBLOQUÉ",
    games: {
      tictactoe: "Morpion",
      memory: "Memory",
      snake: "Mini Snake",
      breakout: "Casse-Briques",
      whack: "Tape-Bug",
      reaction: "Test Réflexe"
    },
    description: "DESCRIPTION",
    experience: "EXPÉRIENCE",
    relatedProjects: "PROJETS",
    contactCta: "Construisons quelque chose de légendaire.",
    sendEmail: "Envoyer un email",
    viewGithub: "Voir GitHub",
    terminalHint: "Essayez 'help', 'recruiter', 'reset', 'status'",
    of: "sur",
    resetProgress: "Réinitialiser",
    resetConfirm: "Réinitialiser toute la progression ?",
    progressReset: "Progression réinitialisée !"
  },
  pl: {
    pressStart: "Naciśnij Start",
    insertCoin: "Wrzuć monetę, aby rozpocząć",
    arcadeMode: "Tryb Arcade",
    arcadeModeDesc: "Graj w mini-gry, aby odblokować umiejętności",
    recruiterMode: "Tryb Rekrutera",
    recruiterModeDesc: "Natychmiastowy dostęp — bez gier",
    achievements: "Osiągnięcia",
    unlocked: "Odblokowane",
    locked: "Zablokowane",
    progression: "Postęp Gracza",
    selectGame: "Wybierz grę",
    play: "Graj",
    skip: "Pomiń",
    backToHub: "Powrót do Hubu",
    projects: "Projekty",
    aboutMe: "O mnie",
    contact: "Kontakt",
    skills: "Umiejętności",
    aboutText: "Junior Unity developer z pasją do tworzenia immersyjnych doświadczeń. Buduję gry, aplikacje mobilne i full-stack web — płynnie w C#, JavaScript, z miłością do retro.",
    heroTitle: "ARCADE.DEV",
    heroSubtitle: "Interaktywne Portfolio",
    heroTagline: "Junior Unity Developer · Full-Stack",
    flipCard: "Kliknij, aby odwrócić",
    completed: "Ukończone!",
    youWin: "Wygrana!",
    tryAgain: "Spróbuj ponownie",
    rewardUnlocked: "OSIĄGNIĘCIE ODBLOKOWANE",
    games: {
      tictactoe: "Kółko i krzyżyk",
      memory: "Memory",
      snake: "Mini Snake",
      breakout: "Arkanoid",
      whack: "Trafiaj-Buga",
      reaction: "Test Refleksu"
    },
    description: "OPIS",
    experience: "DOŚWIADCZENIE",
    relatedProjects: "PROJEKTY",
    contactCta: "Zbudujmy coś legendarnego.",
    sendEmail: "Wyślij email",
    viewGithub: "Zobacz GitHub",
    terminalHint: "Wpisz 'help', 'recruiter', 'reset', 'status'",
    of: "z",
    resetProgress: "Reset",
    resetConfirm: "Zresetować postęp?",
    progressReset: "Postęp zresetowany!"
  }
};
const ACHIEVEMENTS = [
  {
    id: "unity",
    title: "Unity",
    category: "Game Dev",
    icon: "🎮",
    color: "pink",
    desc: { en: "Build 2D/3D games & interactive experiences with Unity Engine.", fr: "Création de jeux 2D/3D et expériences interactives avec Unity.", pl: "Tworzenie gier 2D/3D i interaktywnych doświadczeń w Unity." },
    experience: { en: "Personal projects, game jams, custom shaders & gameplay systems.", fr: "Projets personnels, game jams, shaders et systèmes de gameplay.", pl: "Projekty osobiste, game jams, własne shadery i systemy gry." },
    projects: ["Neon Runner", "Pixel Quest"]
  },
  {
    id: "csharp",
    title: "C#",
    category: "Language",
    icon: "♯",
    color: "purple",
    desc: { en: "OOP, async, LINQ, Unity scripting & .NET fundamentals.", fr: "POO, async, LINQ, scripting Unity et bases .NET.", pl: "OOP, async, LINQ, skrypty Unity i podstawy .NET." },
    experience: { en: "Daily-driver language for Unity gameplay & tooling.", fr: "Langage du quotidien pour Unity gameplay & tooling.", pl: "Codzienny język dla Unity gameplay i narzędzi." },
    projects: ["Unity gameplay systems"]
  },
  {
    id: "android",
    title: "Android Studio",
    category: "Mobile",
    icon: "🤖",
    color: "green",
    desc: { en: "Native Android apps with Kotlin & Java in Android Studio.", fr: "Apps Android natives avec Kotlin & Java.", pl: "Natywne aplikacje Android z Kotlin & Java." },
    experience: { en: "Built mobile UIs, sensors integration, lifecycle management.", fr: "UI mobiles, capteurs, gestion du cycle de vie.", pl: "UI mobilne, integracja z sensorami, lifecycle." },
    projects: ["Habit tracker app"]
  },
  {
    id: "swiftui",
    title: "SwiftUI",
    category: "Mobile",
    icon: "",
    color: "cyan",
    desc: { en: "Declarative iOS UI with SwiftUI & Combine.", fr: "UI iOS déclarative avec SwiftUI & Combine.", pl: "Deklaratywne UI iOS z SwiftUI & Combine." },
    experience: { en: "Small iOS utilities & prototypes.", fr: "Petits utilitaires & prototypes iOS.", pl: "Małe narzędzia i prototypy iOS." },
    projects: ["iOS prototypes"]
  },
  {
    id: "react",
    title: "React",
    category: "Frontend",
    icon: "⚛",
    color: "cyan",
    desc: { en: "Component-driven UIs, hooks, state, suspense.", fr: "UIs basées composants, hooks, état, suspense.", pl: "UI komponentowe, hooks, state, suspense." },
    experience: { en: "Built this portfolio + several SPAs and dashboards.", fr: "Ce portfolio + plusieurs SPAs et dashboards.", pl: "To portfolio + SPA i dashboardy." },
    projects: ["This portfolio", "Dashboards"]
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    category: "Frontend",
    icon: "🎨",
    color: "cyan",
    desc: { en: "Utility-first styling, design systems, responsive UIs.", fr: "Utility-first, design systems, UIs responsive.", pl: "Utility-first, design systemy, responsywne UI." },
    experience: { en: "Design tokens, custom themes, animation utilities.", fr: "Design tokens, thèmes custom, utilitaires d'animation.", pl: "Design tokens, własne motywy, animacje." },
    projects: ["Portfolio design system"]
  },
  {
    id: "nestjs",
    title: "NestJS",
    category: "Backend",
    icon: "🪺",
    color: "pink",
    desc: { en: "Modular Node.js APIs with TypeScript & decorators.", fr: "APIs Node.js modulaires en TypeScript.", pl: "Modularne API Node.js w TypeScript." },
    experience: { en: "REST APIs, auth, database integration.", fr: "APIs REST, auth, BDD.", pl: "API REST, auth, bazy danych." },
    projects: ["Game leaderboard API"]
  },
  {
    id: "symfony",
    title: "Symfony",
    category: "Backend",
    icon: "🎼",
    color: "purple",
    desc: { en: "PHP framework for robust web apps & APIs.", fr: "Framework PHP pour apps web robustes.", pl: "Framework PHP do solidnych aplikacji." },
    experience: { en: "School & freelance projects with Doctrine ORM.", fr: "Projets école & freelance avec Doctrine.", pl: "Projekty szkolne i freelance z Doctrine." },
    projects: ["Web platform"]
  },
  {
    id: "java",
    title: "Java",
    category: "Language",
    icon: "☕",
    color: "yellow",
    desc: { en: "JVM language for Android & backend services.", fr: "Langage JVM pour Android & backend.", pl: "Język JVM dla Androida i backendu." },
    experience: { en: "Android development & academic CS work.", fr: "Développement Android & travaux académiques.", pl: "Android i prace akademickie." },
    projects: ["Android apps"]
  },
  {
    id: "kotlin",
    title: "Kotlin",
    category: "Language",
    icon: "🟣",
    color: "purple",
    desc: { en: "Modern, expressive language for Android.", fr: "Langage moderne et expressif pour Android.", pl: "Nowoczesny język dla Androida." },
    experience: { en: "Preferred for new Android features.", fr: "Préféré pour nouvelles features Android.", pl: "Preferowany dla nowych funkcji Android." },
    projects: ["Android features"]
  },
  {
    id: "php",
    title: "PHP",
    category: "Language",
    icon: "🐘",
    color: "purple",
    desc: { en: "Server-side scripting, Symfony backbone.", fr: "Scripting serveur, base de Symfony.", pl: "Server-side, podstawa Symfony." },
    experience: { en: "Used in Symfony APIs & legacy support.", fr: "Utilisé dans Symfony et legacy.", pl: "Używany w Symfony i legacy." },
    projects: ["Symfony APIs"]
  },
  {
    id: "js",
    title: "JavaScript",
    category: "Language",
    icon: "🟨",
    color: "yellow",
    desc: { en: "ES2023+, async, the language of the web.", fr: "ES2023+, async, le langage du web.", pl: "ES2023+, async, język web." },
    experience: { en: "Daily — frontend & Node tooling.", fr: "Quotidien — frontend & Node.", pl: "Codziennie — frontend i Node." },
    projects: ["Everywhere"]
  },
  {
    id: "ts",
    title: "TypeScript",
    category: "Language",
    icon: "🔷",
    color: "cyan",
    desc: { en: "Typed JavaScript, generics, strict mode.", fr: "JavaScript typé, génériques, strict.", pl: "Typowany JS, generyki, strict." },
    experience: { en: "Default for any new JS project.", fr: "Par défaut pour tout nouveau projet.", pl: "Domyślny dla nowych projektów." },
    projects: ["This portfolio"]
  },
  {
    id: "html",
    title: "HTML",
    category: "Frontend",
    icon: "📄",
    color: "pink",
    desc: { en: "Semantic, accessible markup.", fr: "Markup sémantique et accessible.", pl: "Semantyczny, dostępny markup." },
    experience: { en: "Foundation of all web work.", fr: "Base de tous les projets web.", pl: "Podstawa pracy webowej." },
    projects: ["All web projects"]
  },
  {
    id: "css",
    title: "CSS",
    category: "Frontend",
    icon: "🎨",
    color: "cyan",
    desc: { en: "Modern CSS: grid, flex, container queries, animations.", fr: "CSS moderne : grid, flex, animations.", pl: "Nowoczesny CSS: grid, flex, animacje." },
    experience: { en: "Custom design systems & motion design.", fr: "Design systems & motion design.", pl: "Design systemy i motion design." },
    projects: ["Portfolio CRT effects"]
  }
];
const KEY = "arcade-portfolio-v1";
const defaultStore = { lang: "en", unlocked: [], recruiter: false, started: false };
const AppContext = createContext(null);
function AppProvider({ children }) {
  const [store, setStore] = useState(defaultStore);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setStore({ ...defaultStore, ...JSON.parse(raw) });
    } catch {
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
    }
  }, [store]);
  const value = useMemo(() => ({
    store,
    t: translations[store.lang],
    setLang: (lang) => setStore((s) => ({ ...s, lang })),
    unlock: (id) => {
      let isNew = false;
      setStore((s) => {
        if (s.unlocked.includes(id)) return s;
        isNew = true;
        return { ...s, unlocked: [...s.unlocked, id] };
      });
      return isNew;
    },
    enableRecruiter: () => setStore((s) => ({ ...s, recruiter: true, started: true, unlocked: ACHIEVEMENTS.map((a) => a.id) })),
    start: () => setStore((s) => ({ ...s, started: true })),
    reset: () => setStore(defaultStore)
  }), [store]);
  return /* @__PURE__ */ jsx(AppContext.Provider, { value, children });
}
function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error("AppProvider missing");
  return c;
}
function Terminal() {
  const { t, store, enableRecruiter, unlock, setLang, reset } = useApp();
  const [lines, setLines] = useState([
    { type: "out", text: "ARCADE OS v2.0 — INITIALIZED", color: "text-glow-green" },
    { type: "out", text: "> user_role? (player / recruiter)" },
    { type: "out", text: "> type 'help' for commands", color: "text-glow-cyan" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999 });
  }, [lines]);
  const out = (text, color) => setLines((l) => [...l, { type: "out", text, color }]);
  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    setLines((l) => [...l, { type: "in", text: raw }]);
    if (!cmd) return;
    if (cmd === "help") {
      out("─── AVAILABLE COMMANDS ───", "text-glow-yellow");
      out("recruiter   unlock showcase mode");
      out("player      arcade greeting");
      out("play        jump to arcade cabinet");
      out("status      show progression");
      out("reset       wipe progress & exit recruiter mode");
      out("unlock-all  cheat: unlock everything");
      out("whoami      session info");
      out("lang xx     en | fr | pl");
      out("clear       clear screen");
    } else if (cmd === "recruiter") {
      out("ACCESS GRANTED ✔", "text-glow-green");
      out("✔ Showcase Mode unlocked");
      out("✔ Achievements available");
      out("✔ Games optional");
      enableRecruiter();
    } else if (cmd === "player") {
      out("Welcome, Player One. Insert coin and press START.", "text-glow-pink");
    } else if (cmd === "play") {
      out("Heading to the arcade cabinet…", "text-glow-cyan");
      document.getElementById("arcade")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "status") {
      const pct = Math.round(store.unlocked.length / ACHIEVEMENTS.length * 100);
      out("─── PLAYER STATUS ───", "text-glow-yellow");
      out(`mode      : ${store.recruiter ? "RECRUITER" : "PLAYER"}`, "text-glow-cyan");
      out(`language  : ${store.lang.toUpperCase()}`);
      out(`unlocked  : ${store.unlocked.length}/${ACHIEVEMENTS.length}  (${pct}%)`);
      const locked = ACHIEVEMENTS.filter((a) => !store.unlocked.includes(a.id)).map((a) => a.title);
      out(`pending   : ${locked.length ? locked.join(", ") : "— all unlocked —"}`);
    } else if (cmd === "reset") {
      reset();
      out("✔ progress wiped — fresh start", "text-glow-green");
      out("✔ recruiter mode disabled");
    } else if (cmd === "unlock-all") {
      ACHIEVEMENTS.forEach((a) => unlock(a.id));
      out("All achievements unlocked.", "text-glow-yellow");
    } else if (cmd === "whoami") {
      out(`> player(lang=${store.lang}, unlocked=${store.unlocked.length}/${ACHIEVEMENTS.length}, recruiter=${store.recruiter})`);
    } else if (cmd.startsWith("lang ")) {
      const l = cmd.split(" ")[1];
      if (l === "en" || l === "fr" || l === "pl") {
        setLang(l);
        out(`language → ${l.toUpperCase()}`, "text-glow-cyan");
      } else out("usage: lang en|fr|pl");
    } else if (cmd === "clear") {
      setLines([]);
    } else {
      out(`unknown command: ${cmd} — try 'help'`, "text-glow-pink");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "glass pixel-corners p-3 sm:p-4 max-w-3xl mx-auto crt-flicker", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-destructive" }),
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full", style: { background: "var(--neon-yellow)" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full", style: { background: "var(--neon-green)" } }),
      /* @__PURE__ */ jsx("span", { className: "ml-2 font-display text-[10px] text-glow-cyan", children: "arcade-terminal ~ /home" }),
      /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-muted-foreground hidden sm:inline", children: t.terminalHint })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "bg-black/60 rounded-md p-3 h-44 overflow-auto font-mono-retro text-lg leading-tight", children: [
      lines.map((ln, i) => /* @__PURE__ */ jsx("div", { className: ln.color ?? "text-glow-green", children: ln.type === "in" ? /* @__PURE__ */ jsxs("span", { className: "text-glow-pink", children: [
        "> ",
        ln.text
      ] }) : ln.text }, i)),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            run(input);
            setInput("");
          },
          className: "flex items-center gap-1 mt-1",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-glow-pink", children: ">" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                className: "flex-1 bg-transparent outline-none text-glow-green font-mono-retro text-lg",
                spellCheck: false,
                autoCapitalize: "off",
                autoCorrect: "off"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-glow-green blink", children: "▮" })
          ]
        }
      )
    ] })
  ] });
}
function TicTacToe({ onWin }) {
  const [b, setB] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [done, setDone] = useState(null);
  const winner = (cells) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, c, d] of lines) if (cells[a] && cells[a] === cells[c] && cells[a] === cells[d]) return cells[a];
    if (cells.every(Boolean)) return "draw";
    return null;
  };
  const play = (i) => {
    if (b[i] || done) return;
    const next = [...b];
    next[i] = turn;
    setB(next);
    const w = winner(next);
    if (w) {
      setDone(w);
      onWin();
      return;
    }
    setTurn(turn === "X" ? "O" : "X");
  };
  useEffect(() => {
    if (turn !== "O" || done) return;
    const empty = b.map((v, i) => v ? -1 : i).filter((i) => i >= 0);
    if (!empty.length) return;
    const move = empty[Math.floor(Math.random() * empty.length)];
    const id = setTimeout(() => play(move), 400);
    return () => clearTimeout(id);
  }, [turn, b, done]);
  const reset = () => {
    setB(Array(9).fill(null));
    setTurn("X");
    setDone(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: b.map((v, i) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => play(i),
        className: "w-16 h-16 sm:w-20 sm:h-20 glass pixel-corners font-display text-2xl text-glow-cyan hover:bg-white/5 transition active:scale-95",
        children: v ?? ""
      },
      i
    )) }),
    done && /* @__PURE__ */ jsxs("div", { className: "text-glow-pink font-display text-sm fade-up", children: [
      done === "draw" ? "DRAW" : `${done} WINS`,
      " —",
      " ",
      /* @__PURE__ */ jsx("button", { onClick: reset, className: "underline", children: "replay" })
    ] })
  ] });
}
const EMOJIS = ["🎮", "👾", "🕹️", "💾", "🪙", "⭐"];
function Memory({ onWin }) {
  const [cards, setCards] = useState([]);
  const [pick, setPick] = useState([]);
  useEffect(() => {
    const deck = [...EMOJIS, ...EMOJIS].map((v) => ({ v, flipped: false, matched: false })).sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);
  useEffect(() => {
    if (pick.length !== 2) return;
    const [a, b] = pick;
    const next = [...cards];
    if (cards[a].v === cards[b].v) {
      next[a].matched = true;
      next[b].matched = true;
      setCards(next);
      setPick([]);
      if (next.every((c) => c.matched)) setTimeout(onWin, 400);
    } else {
      setTimeout(() => {
        next[a].flipped = false;
        next[b].flipped = false;
        setCards(next);
        setPick([]);
      }, 700);
    }
  }, [pick]);
  const flip = (i) => {
    if (cards[i].flipped || cards[i].matched || pick.length === 2) return;
    const next = [...cards];
    next[i].flipped = true;
    setCards(next);
    setPick([...pick, i]);
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: cards.map((c, i) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => flip(i),
      className: `w-14 h-14 sm:w-16 sm:h-16 pixel-corners flex items-center justify-center text-2xl transition active:scale-95 ${c.flipped || c.matched ? "bg-gradient-neon" : "glass"}`,
      children: (c.flipped || c.matched) && c.v
    },
    i
  )) });
}
function Snake({ onWin }) {
  const SIZE = 12, GOAL = 5;
  const [snake, setSnake] = useState([[5, 5]]);
  const [dir, setDir] = useState([1, 0]);
  const [food, setFood] = useState([8, 5]);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [won, setWon] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const turn = (d) => {
    const cur = dirRef.current;
    if (d[0] === -cur[0] && d[1] === -cur[1]) return;
    setDir(d);
  };
  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0]
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        turn(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const touch = useRef(null);
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return;
    if (Math.abs(dx) > Math.abs(dy)) turn([dx > 0 ? 1 : -1, 0]);
    else turn([0, dy > 0 ? 1 : -1]);
    touch.current = null;
  };
  useEffect(() => {
    if (dead || won) return;
    const id = setInterval(() => {
      setSnake((s) => {
        const d = dirRef.current;
        const head = [s[0][0] + d[0], s[0][1] + d[1]];
        if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE || s.some(([x, y]) => x === head[0] && y === head[1])) {
          setDead(true);
          return s;
        }
        const ate = head[0] === food[0] && head[1] === food[1];
        const next = [head, ...s];
        if (!ate) next.pop();
        else {
          setScore((sc) => {
            const ns = sc + 1;
            if (ns >= GOAL) {
              setWon(true);
              setTimeout(onWin, 300);
            }
            return ns;
          });
          let nf;
          do {
            nf = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
          } while (next.some(([x, y]) => x === nf[0] && y === nf[1]));
          setFood(nf);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, [food, dead, won]);
  const restart = () => {
    setSnake([[5, 5]]);
    setDir([1, 0]);
    setFood([8, 5]);
    setScore(0);
    setDead(false);
    setWon(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "font-display text-xs text-glow-yellow", children: [
      "SCORE ",
      score,
      "/",
      GOAL
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        onTouchStart,
        onTouchEnd,
        className: "grid bg-black/60 p-2 pixel-corners touch-none select-none",
        style: { gridTemplateColumns: `repeat(${SIZE}, 14px)`, gap: 1 },
        children: Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE, y = Math.floor(i / SIZE);
          const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
          const isHead = snake[0][0] === x && snake[0][1] === y;
          const isFood = food[0] === x && food[1] === y;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-3.5 h-3.5",
              style: {
                background: isHead ? "var(--neon-pink)" : isSnake ? "var(--neon-cyan)" : isFood ? "var(--neon-yellow)" : "oklch(0.18 0.05 280)",
                boxShadow: isFood ? "0 0 8px var(--neon-yellow)" : isHead ? "0 0 6px var(--neon-pink)" : void 0
              }
            },
            i
          );
        })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "dpad mt-1", children: [
      /* @__PURE__ */ jsx("button", { "aria-label": "up", onClick: () => turn([0, -1]), className: "dpad-btn dpad-up", children: "▲" }),
      /* @__PURE__ */ jsx("button", { "aria-label": "left", onClick: () => turn([-1, 0]), className: "dpad-btn dpad-left", children: "◀" }),
      /* @__PURE__ */ jsx("button", { "aria-label": "right", onClick: () => turn([1, 0]), className: "dpad-btn dpad-right", children: "▶" }),
      /* @__PURE__ */ jsx("button", { "aria-label": "down", onClick: () => turn([0, 1]), className: "dpad-btn dpad-down", children: "▼" })
    ] }),
    dead && /* @__PURE__ */ jsx("button", { onClick: restart, className: "neon-btn neon-btn-pink", children: "Game Over — Retry" }),
    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "Swipe / D-pad / Arrows" })
  ] });
}
function Breakout({ onWin }) {
  const W = 240, H = 280, PADDLE_W = 56, PADDLE_H = 6, BALL = 5;
  const ROWS = 3, COLS = 6, BRICK_W = 36, BRICK_H = 12, BRICK_GAP = 2, BRICK_TOP = 16;
  const wrapRef = useRef(null);
  const [paddleX, setPaddleX] = useState(W / 2 - PADDLE_W / 2);
  const paddleRef = useRef(paddleX);
  paddleRef.current = paddleX;
  const [ball, setBall] = useState({ x: W / 2, y: H - 30, vx: 2.2, vy: -2.4 });
  const [bricks, setBricks] = useState(
    () => Array.from({ length: ROWS * COLS }, () => true)
  );
  const [done, setDone] = useState(null);
  useEffect(() => {
    if (done) return;
    let raf;
    const tick = () => {
      setBall((b) => {
        let { x, y, vx, vy } = b;
        x += vx;
        y += vy;
        if (x <= BALL || x >= W - BALL) vx = -vx;
        if (y <= BALL) vy = -vy;
        if (y >= H - 14 && y <= H - 6 && x >= paddleRef.current && x <= paddleRef.current + PADDLE_W) {
          vy = -Math.abs(vy);
          const hit = (x - paddleRef.current) / PADDLE_W - 0.5;
          vx = hit * 4;
        }
        setBricks((br) => {
          let changed = false;
          const next = [...br];
          for (let i = 0; i < next.length; i++) {
            if (!next[i]) continue;
            const r = Math.floor(i / COLS), c = i % COLS;
            const bx = c * (BRICK_W + BRICK_GAP) + (W - COLS * (BRICK_W + BRICK_GAP)) / 2;
            const by = BRICK_TOP + r * (BRICK_H + BRICK_GAP);
            if (x >= bx && x <= bx + BRICK_W && y >= by && y <= by + BRICK_H) {
              next[i] = false;
              vy = -vy;
              changed = true;
              break;
            }
          }
          if (changed && next.every((v) => !v)) {
            setDone("win");
            setTimeout(onWin, 300);
          }
          return changed ? next : br;
        });
        if (y > H) {
          setDone("lose");
        }
        return { x, y, vx, vy };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done]);
  const move = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rel = (clientX - rect.left) / rect.width * W;
    setPaddleX(Math.max(0, Math.min(W - PADDLE_W, rel - PADDLE_W / 2)));
  };
  const restart = () => {
    setBall({ x: W / 2, y: H - 30, vx: 2.2, vy: -2.4 });
    setBricks(Array.from({ length: ROWS * COLS }, () => true));
    setDone(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 select-none", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: wrapRef,
        onMouseMove: (e) => move(e.clientX),
        onTouchMove: (e) => move(e.touches[0].clientX),
        onTouchStart: (e) => move(e.touches[0].clientX),
        className: "relative bg-black/60 pixel-corners touch-none",
        style: { width: "min(90vw, 240px)", aspectRatio: `${W}/${H}` },
        children: /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "absolute inset-0 w-full h-full", children: [
          bricks.map((on, i) => {
            if (!on) return null;
            const r = Math.floor(i / COLS), c = i % COLS;
            const bx = c * (BRICK_W + BRICK_GAP) + (W - COLS * (BRICK_W + BRICK_GAP)) / 2;
            const by = BRICK_TOP + r * (BRICK_H + BRICK_GAP);
            const colors = ["var(--neon-pink)", "var(--neon-yellow)", "var(--neon-cyan)"];
            return /* @__PURE__ */ jsx("rect", { x: bx, y: by, width: BRICK_W, height: BRICK_H, fill: colors[r], opacity: 0.9 }, i);
          }),
          /* @__PURE__ */ jsx("rect", { x: paddleX, y: H - 12, width: PADDLE_W, height: PADDLE_H, fill: "var(--neon-cyan)" }),
          /* @__PURE__ */ jsx("circle", { cx: ball.x, cy: ball.y, r: BALL, fill: "var(--neon-pink)" })
        ] })
      }
    ),
    done === "lose" && /* @__PURE__ */ jsx("button", { onClick: restart, className: "neon-btn neon-btn-pink", children: "Retry" }),
    /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "Drag / Move to control paddle" })
  ] });
}
function WhacABug({ onWin }) {
  const HOLES = 9, GOAL = 8, DURATION = 20;
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [done, setDone] = useState(null);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setActive(Math.floor(Math.random() * HOLES));
    }, 750);
    const c = setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          setDone((d) => d ?? "lose");
          return 0;
        }
        return s - 1;
      });
    }, 1e3);
    return () => {
      clearInterval(t);
      clearInterval(c);
    };
  }, [done]);
  const hit = (i) => {
    if (done || active !== i) return;
    setActive(null);
    setScore((s) => {
      const ns = s + 1;
      if (ns >= GOAL) {
        setDone("win");
        setTimeout(onWin, 300);
      }
      return ns;
    });
  };
  const restart = () => {
    setScore(0);
    setTime(DURATION);
    setDone(null);
    setActive(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 font-display text-xs", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-glow-yellow", children: [
        "SCORE ",
        score,
        "/",
        GOAL
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-glow-cyan", children: [
        "TIME ",
        time,
        "s"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: Array.from({ length: HOLES }).map((_, i) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => hit(i),
        className: `w-16 h-16 sm:w-20 sm:h-20 pixel-corners flex items-center justify-center text-3xl transition active:scale-90 ${active === i ? "bg-gradient-neon scale-110" : "bg-black/60"}`,
        children: active === i ? "🐛" : "·"
      },
      i
    )) }),
    done === "lose" && /* @__PURE__ */ jsx("button", { onClick: restart, className: "neon-btn neon-btn-pink", children: "Retry" })
  ] });
}
function Reaction({ onWin }) {
  const [phase, setPhase] = useState("idle");
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState([]);
  const startRef = useRef(0);
  const timer = useRef(null);
  const ROUNDS = 3, THRESHOLD = 600;
  const begin = () => {
    setPhase("wait");
    timer.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("go");
    }, 900 + Math.random() * 1800);
  };
  const click = () => {
    if (phase === "idle" || phase === "result" || phase === "early") {
      setRound(0);
      setTimes([]);
      begin();
      return;
    }
    if (phase === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const dt = performance.now() - startRef.current;
      const nextTimes = [...times, dt];
      const nextRound = round + 1;
      setTimes(nextTimes);
      if (nextRound >= ROUNDS) {
        setRound(nextRound);
        setPhase("result");
        const avg2 = nextTimes.reduce((a, b) => a + b, 0) / nextTimes.length;
        if (avg2 < THRESHOLD) setTimeout(onWin, 400);
      } else {
        setRound(nextRound);
        begin();
      }
    }
  };
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const bg = phase === "go" ? "bg-[var(--neon-green)]" : phase === "wait" ? "bg-[oklch(0.4_0.2_20)]" : phase === "early" ? "bg-[var(--neon-pink)]" : "bg-black/60";
  const label = phase === "idle" ? "TAP TO START" : phase === "wait" ? "WAIT…" : phase === "go" ? "TAP NOW!" : phase === "early" ? "TOO EARLY — TAP TO RETRY" : avg < THRESHOLD ? `★ AVG ${avg}ms ★` : `AVG ${avg}ms — TAP TO RETRY`;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "font-display text-xs text-glow-yellow", children: [
      "ROUND ",
      Math.min(round + (phase === "go" || phase === "wait" ? 1 : 0), ROUNDS),
      "/",
      ROUNDS
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: click,
        className: `w-full max-w-xs h-44 pixel-corners font-display text-sm text-glow-cyan transition ${bg} active:scale-95`,
        children: label
      }
    ),
    phase === "result" && /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
      "Times: ",
      times.map((t) => Math.round(t)).join(" · "),
      " ms"
    ] })
  ] });
}
const GAME_REWARDS = {
  tictactoe: ["unity", "csharp"],
  memory: ["react", "tailwind", "html", "css"],
  snake: ["js", "ts"],
  breakout: ["nestjs", "symfony", "php"],
  whack: ["android", "kotlin", "java"],
  reaction: ["swiftui"]
};
const GAME_ICONS = {
  tictactoe: "⊞",
  memory: "🧠",
  snake: "🐍",
  breakout: "🧱",
  whack: "🐛",
  reaction: "⚡"
};
function ArcadeMachine() {
  const { t, store, unlock } = useApp();
  const [game, setGame] = useState(null);
  const [reward, setReward] = useState(null);
  const onWin = () => {
    if (!game) return;
    const candidates = GAME_REWARDS[game].filter((id2) => !store.unlocked.includes(id2));
    const id = candidates[0] ?? GAME_REWARDS[game][0];
    unlock(id);
    setReward(id);
    setTimeout(() => setReward(null), 2400);
  };
  return /* @__PURE__ */ jsxs("div", { id: "arcade", className: "relative mx-auto w-full max-w-[640px] px-2 sm:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "cabinet relative", children: [
      /* @__PURE__ */ jsx("div", { className: "cab-speaker cab-speaker-left", "aria-hidden": true }),
      /* @__PURE__ */ jsx("div", { className: "cab-speaker cab-speaker-right", "aria-hidden": true }),
      /* @__PURE__ */ jsx("div", { className: "cab-marquee", children: /* @__PURE__ */ jsx("div", { className: "cab-marquee-inner", children: /* @__PURE__ */ jsx("div", { className: "font-display text-[11px] sm:text-sm text-glow-pink crt-flicker tracking-widest", children: "★ ARCADE.DEV ★" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "cab-bezel", children: /* @__PURE__ */ jsx("div", { className: "crt-screen crt-scanlines cab-screen", children: reward ? /* @__PURE__ */ jsx(RewardSplash, { id: reward }) : !game ? /* @__PURE__ */ jsxs("div", { className: "text-center w-full fade-up", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-display text-[10px] sm:text-xs text-glow-yellow mb-3", children: [
          "★ ",
          t.selectGame,
          " ★"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:gap-3", children: Object.keys(GAME_REWARDS).map((k) => /* @__PURE__ */ jsx(GameBtn, { icon: GAME_ICONS[k], label: t.games[k], onClick: () => setGame(k) }, k)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-[10px] text-muted-foreground blink", children: t.insertCoin })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "w-full fade-up flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-[10px] text-glow-cyan", children: t.games[game] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setGame(null), className: "font-display text-[9px] text-glow-pink hover:underline", children: [
            "← ",
            t.backToHub
          ] })
        ] }),
        game === "tictactoe" && /* @__PURE__ */ jsx(TicTacToe, { onWin }),
        game === "memory" && /* @__PURE__ */ jsx(Memory, { onWin }),
        game === "snake" && /* @__PURE__ */ jsx(Snake, { onWin }),
        game === "breakout" && /* @__PURE__ */ jsx(Breakout, { onWin }),
        game === "whack" && /* @__PURE__ */ jsx(WhacABug, { onWin }),
        game === "reaction" && /* @__PURE__ */ jsx(Reaction, { onWin })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "cab-controls", children: [
        /* @__PURE__ */ jsxs("div", { className: "joystick", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("div", { className: "joystick-shaft" }),
          /* @__PURE__ */ jsx("div", { className: "joystick-ball" }),
          /* @__PURE__ */ jsx("div", { className: "joystick-base" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cab-buttons", children: ["pink", "yellow", "cyan", "green"].map((c) => /* @__PURE__ */ jsx("div", { className: "arcade-btn", style: { background: `var(--neon-${c})`, boxShadow: `0 0 14px var(--neon-${c}), inset 0 -3px 0 oklch(0 0 0 / 0.4)` } }, c)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cab-coin", children: [
        /* @__PURE__ */ jsx("div", { className: "coin-slot" }),
        /* @__PURE__ */ jsx("div", { className: "font-display text-[8px] text-glow-yellow mt-1 tracking-widest", children: "INSERT COIN" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cab-stand" }),
    /* @__PURE__ */ jsx("div", { className: "cab-shadow" })
  ] });
}
function GameBtn({ icon, label, onClick }) {
  return /* @__PURE__ */ jsxs("button", { onClick, className: "neon-btn neon-btn-pink w-full flex items-center justify-center gap-2 py-2 text-[10px]", children: [
    /* @__PURE__ */ jsx("span", { className: "text-base", children: icon }),
    " ",
    label
  ] });
}
function RewardSplash({ id }) {
  const { t } = useApp();
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  return /* @__PURE__ */ jsxs("div", { className: "text-center scale-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "font-display text-[10px] text-glow-yellow mb-2", children: [
      "★ ",
      t.rewardUnlocked,
      " ★"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-6xl mb-3 neon-pulse", children: ach?.icon }),
    /* @__PURE__ */ jsx("div", { className: "font-display text-sm text-glow-pink", children: ach?.title }),
    /* @__PURE__ */ jsx("div", { className: "text-xs mt-1 text-glow-cyan", children: ach?.category }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-[10px] text-muted-foreground blink", children: t.completed })
  ] });
}
const colorMap = {
  pink: { glow: "text-glow-pink", border: "border-neon-pink" },
  cyan: { glow: "text-glow-cyan", border: "border-neon-cyan" },
  yellow: { glow: "text-glow-yellow", border: "border-neon-pink" },
  green: { glow: "text-glow-green", border: "border-neon-cyan" },
  purple: { glow: "text-glow-pink", border: "border-neon-pink" }
};
function AchievementGrid() {
  const { store, t } = useApp();
  const [flipped, setFlipped] = useState(null);
  const [recent, setRecent] = useState(null);
  useEffect(() => {
    const last = store.unlocked[store.unlocked.length - 1];
    if (last) {
      setRecent(last);
      const id = setTimeout(() => setRecent(null), 1200);
      return () => clearTimeout(id);
    }
  }, [store.unlocked.length]);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: ACHIEVEMENTS.map((a) => {
    const isUnlocked = store.unlocked.includes(a.id);
    const isFlipped = flipped === a.id;
    const c = colorMap[a.color];
    const desc = a.desc[store.lang];
    const exp = a.experience[store.lang];
    return /* @__PURE__ */ jsx("div", { className: `card-flip h-56 ${isFlipped ? "flipped" : ""} ${recent === a.id ? "scale-in" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "card-flip-inner h-full", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => isUnlocked && setFlipped(isFlipped ? null : a.id),
          disabled: !isUnlocked,
          className: `card-face absolute inset-0 glass pixel-corners p-4 flex flex-col items-center justify-center text-center hover-lift ${!isUnlocked ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl mb-2 neon-pulse", children: isUnlocked ? a.icon : "🔒" }),
            /* @__PURE__ */ jsx("div", { className: `font-display text-xs ${isUnlocked ? c.glow : "text-muted-foreground"}`, children: a.title }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] mt-1 text-muted-foreground uppercase tracking-widest", children: a.category }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 text-[10px] font-display", children: isUnlocked ? /* @__PURE__ */ jsxs("span", { className: "text-glow-green", children: [
              "★ ",
              t.unlocked
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: t.locked }) }),
            isUnlocked && /* @__PURE__ */ jsx("div", { className: "text-[9px] mt-2 text-muted-foreground", children: t.flipCard })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => setFlipped(null),
          className: `card-face card-back absolute inset-0 glass pixel-corners p-3 cursor-pointer overflow-auto ${c.border}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `font-display text-[11px] mb-1 ${c.glow}`, children: a.title }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase text-muted-foreground tracking-wider mb-2", children: a.category }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-display text-glow-yellow", children: t.description }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/90 mb-2 leading-snug", children: desc }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-display text-glow-yellow", children: t.experience }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/90 mb-2 leading-snug", children: exp }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-display text-glow-yellow", children: t.relatedProjects }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground/90 leading-snug", children: a.projects.join(" · ") })
          ]
        }
      )
    ] }) }, a.id);
  }) });
}
function ProgressionBar() {
  const { store, t } = useApp();
  const total = ACHIEVEMENTS.length;
  const got = store.unlocked.length;
  const pct = Math.round(got / total * 100);
  const blocks = 20;
  const filled = Math.round(pct / 100 * blocks);
  return /* @__PURE__ */ jsxs("div", { className: "glass pixel-corners p-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-display text-[10px] mb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-glow-pink", children: t.progression }),
      /* @__PURE__ */ jsxs("span", { className: "text-glow-cyan", children: [
        got,
        "/",
        total,
        " ",
        t.achievements
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "font-mono-retro text-xl tracking-tight text-glow-green", children: [
      "█".repeat(filled),
      "░".repeat(blocks - filled),
      " ",
      pct,
      "%"
    ] })
  ] });
}
function Page() {
  const {
    t,
    store,
    start,
    enableRecruiter,
    setLang,
    reset
  } = useApp();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const onReset = () => {
    if (typeof window !== "undefined" && window.confirm(t.resetConfirm)) {
      reset();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsx("div", { className: "scanline-overlay" }),
    /* @__PURE__ */ jsx("div", { className: "vignette" }),
    /* @__PURE__ */ jsxs("header", { className: "relative z-10 px-4 sm:px-8 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("a", { href: "#top", className: "font-display text-sm text-glow-pink crt-flicker", children: "▮ ARCADE.DEV" }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-5 font-display text-[10px]", children: [
        /* @__PURE__ */ jsx("a", { href: "#arcade", className: "text-glow-cyan hover:text-glow-pink transition", children: "PLAY" }),
        /* @__PURE__ */ jsx("a", { href: "#achievements", className: "text-glow-cyan hover:text-glow-pink transition", children: t.achievements.toUpperCase() }),
        /* @__PURE__ */ jsx("a", { href: "#projects", className: "text-glow-cyan hover:text-glow-pink transition", children: t.projects.toUpperCase() }),
        /* @__PURE__ */ jsx("a", { href: "#about", className: "text-glow-cyan hover:text-glow-pink transition", children: t.aboutMe.toUpperCase() }),
        /* @__PURE__ */ jsx("a", { href: "#contact", className: "text-glow-cyan hover:text-glow-pink transition", children: t.contact.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        (store.unlocked.length > 0 || store.recruiter) && /* @__PURE__ */ jsxs("button", { onClick: onReset, title: t.resetProgress, className: "font-display text-[9px] px-2 py-1 border border-[var(--neon-pink)]/60 text-glow-pink hover:bg-[var(--neon-pink)] hover:text-background rounded-sm transition", children: [
          "↻ ",
          t.resetProgress
        ] }),
        /* @__PURE__ */ jsx(LangSwitcher, { onChange: setLang, current: store.lang })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "top", className: "relative px-4 pt-6 pb-16 text-center overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-72 opacity-40 pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "grid-floor" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 fade-up", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-[10px] text-glow-cyan tracking-widest mb-4", children: "◆ INSERT COIN · LOADING WORLD · 1987 ◆" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-6xl md:text-7xl text-glow-pink mb-4 crt-flicker", children: t.heroTitle }),
        /* @__PURE__ */ jsx("p", { className: "font-display text-xs sm:text-sm text-glow-cyan mb-2", children: t.heroSubtitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: t.heroTagline }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            start();
            document.getElementById("arcade")?.scrollIntoView({
              behavior: "smooth"
            });
          }, className: "neon-btn neon-btn-pink flex-1 group", children: [
            "▶ ",
            t.arcadeMode,
            /* @__PURE__ */ jsx("div", { className: "text-[8px] mt-1 opacity-70 normal-case tracking-normal", children: t.arcadeModeDesc })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => {
            enableRecruiter();
            document.getElementById("achievements")?.scrollIntoView({
              behavior: "smooth"
            });
          }, className: "neon-btn flex-1", children: [
            "⚡ ",
            t.recruiterMode,
            /* @__PURE__ */ jsx("div", { className: "text-[8px] mt-1 opacity-70 normal-case tracking-normal", children: t.recruiterModeDesc })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10", children: hydrated && /* @__PURE__ */ jsx(Terminal, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative px-4 py-16", children: [
      /* @__PURE__ */ jsx(SectionTitle, { eyebrow: "◆ MAIN HUB ◆", title: "THE ARCADE CABINET" }),
      /* @__PURE__ */ jsx(ArcadeMachine, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "achievements", className: "relative px-4 sm:px-8 py-16 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionTitle, { eyebrow: `★ ${t.skills} ★`, title: t.achievements.toUpperCase() }),
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(ProgressionBar, {}) }),
      /* @__PURE__ */ jsx(AchievementGrid, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "projects", className: "relative px-4 sm:px-8 py-16 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionTitle, { eyebrow: "◆ PORTFOLIO ◆", title: t.projects.toUpperCase() }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: PROJECTS.map((p) => /* @__PURE__ */ jsxs("article", { className: "glass pixel-corners p-5 hover-lift", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3 neon-pulse", children: p.icon }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xs text-glow-pink mb-2", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/80 mb-3", children: p.desc[store.lang] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: p.tech.map((tch) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-display px-2 py-1 border border-[var(--neon-cyan)]/40 text-glow-cyan rounded-sm", children: tch }, tch)) })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "about", className: "relative px-4 sm:px-8 py-16 max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx(SectionTitle, { eyebrow: "◆ PLAYER FILE ◆", title: t.aboutMe.toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "glass pixel-corners p-6 fade-up", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4 float-y", children: "🕹️" }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground/90 leading-relaxed", children: t.aboutText })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "contact", className: "relative px-4 sm:px-8 py-16 max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx(SectionTitle, { eyebrow: "◆ TRANSMISSION ◆", title: t.contact.toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "glass pixel-corners p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-xs text-glow-yellow mb-4 crt-flicker", children: t.contactCta }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-center flex-wrap", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:hello@arcade.dev", className: "neon-btn neon-btn-pink", children: [
            "✉ ",
            t.sendEmail
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://github.com", target: "_blank", rel: "noreferrer", className: "neon-btn", children: [
            "⌨ ",
            t.viewGithub
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "text-center py-8 font-display text-[9px] text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ARCADE.DEV — ",
      /* @__PURE__ */ jsx("span", { className: "text-glow-pink blink", children: "PRESS START" })
    ] })
  ] });
}
function SectionTitle({
  eyebrow,
  title
}) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 fade-up", children: [
    /* @__PURE__ */ jsx("div", { className: "font-display text-[10px] text-glow-cyan tracking-widest mb-3", children: eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl sm:text-3xl text-glow-pink", children: title })
  ] });
}
function LangSwitcher({
  current,
  onChange
}) {
  const langs = ["en", "fr", "pl"];
  return /* @__PURE__ */ jsx("div", { className: "glass pixel-corners flex p-1 gap-1", children: langs.map((l) => /* @__PURE__ */ jsx("button", { onClick: () => onChange(l), className: `font-display text-[10px] px-2 py-1 rounded-sm transition ${current === l ? "bg-[var(--neon-pink)] text-background" : "text-glow-cyan hover:text-glow-pink"}`, children: l.toUpperCase() }, l)) });
}
const PROJECTS = [{
  title: "NEON RUNNER",
  icon: "🏃",
  desc: {
    en: "An endless arcade runner built in Unity with custom shaders and pickup combos.",
    fr: "Un runner arcade infini en Unity avec shaders custom et combos.",
    pl: "Niekończący się arcade runner w Unity z własnymi shaderami."
  },
  tech: ["Unity", "C#", "Shader Graph"]
}, {
  title: "PIXEL QUEST",
  icon: "⚔️",
  desc: {
    en: "Top-down pixel-art RPG prototype with dialog system and inventory.",
    fr: "Prototype RPG pixel-art top-down avec dialogues et inventaire.",
    pl: "Prototyp pixel-art RPG z dialogami i ekwipunkiem."
  },
  tech: ["Unity", "C#", "Tilemap"]
}, {
  title: "HABIT TRACKER",
  icon: "📱",
  desc: {
    en: "Native Android habit tracker with streaks, reminders & widgets.",
    fr: "App Android de suivi d'habitudes avec streaks et widgets.",
    pl: "Natywna aplikacja Android do śledzenia nawyków."
  },
  tech: ["Kotlin", "Android Studio"]
}, {
  title: "LEADERBOARD API",
  icon: "🏆",
  desc: {
    en: "NestJS REST API powering global game leaderboards with auth.",
    fr: "API REST NestJS pour leaderboards de jeu avec auth.",
    pl: "API REST w NestJS do rankingów gier z autoryzacją."
  },
  tech: ["NestJS", "TypeScript", "Postgres"]
}, {
  title: "ARCADE.DEV",
  icon: "🕹️",
  desc: {
    en: "This site — a playable React portfolio with CRT aesthetics and i18n.",
    fr: "Ce site — un portfolio React jouable avec esthétique CRT et i18n.",
    pl: "Ta strona — grywalne portfolio React z efektem CRT."
  },
  tech: ["React", "Tailwind", "TS"]
}, {
  title: "PORTFOLIO API",
  icon: "🛠️",
  desc: {
    en: "Symfony backend serving content and contact pipeline.",
    fr: "Backend Symfony servant contenu et pipeline contact.",
    pl: "Backend Symfony obsługujący treść i kontakt."
  },
  tech: ["Symfony", "PHP", "Doctrine"]
}];
const SplitComponent = () => /* @__PURE__ */ jsx(AppProvider, { children: /* @__PURE__ */ jsx(Page, {}) });
export {
  SplitComponent as component
};
