import { useEffect, useState } from "react";

/* ---------------- Tic Tac Toe ---------------- */
export function TicTacToe({ onWin }: { onWin: () => void }) {
  const [b, setB] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [done, setDone] = useState<string | null>(null);

  const winner = (cells: typeof b) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a, c, d] of lines) if (cells[a] && cells[a] === cells[c] && cells[a] === cells[d]) return cells[a];
    if (cells.every(Boolean)) return "draw";
    return null;
  };

  const play = (i: number) => {
    if (b[i] || done) return;
    const next = [...b]; next[i] = turn;
    setB(next);
    const w = winner(next);
    if (w) { setDone(w); if (w !== "draw") onWin(); else onWin(); return; }
    setTurn(turn === "X" ? "O" : "X");
  };

  // simple AI
  useEffect(() => {
    if (turn !== "O" || done) return;
    const empty = b.map((v, i) => v ? -1 : i).filter((i) => i >= 0);
    if (!empty.length) return;
    const move = empty[Math.floor(Math.random() * empty.length)];
    const id = setTimeout(() => play(move), 400);
    return () => clearTimeout(id);
  }, [turn, b, done]);

  const reset = () => { setB(Array(9).fill(null)); setTurn("X"); setDone(null); };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-3 gap-2">
        {b.map((v, i) => (
          <button key={i} onClick={() => play(i)}
            className="w-16 h-16 sm:w-20 sm:h-20 glass pixel-corners font-display text-2xl text-glow-cyan hover:bg-white/5 transition">
            {v ?? ""}
          </button>
        ))}
      </div>
      {done && (
        <div className="text-glow-pink font-display text-sm fade-up">
          {done === "draw" ? "DRAW" : `${done} WINS`} —{" "}
          <button onClick={reset} className="underline">replay</button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Memory ---------------- */
const EMOJIS = ["🎮", "👾", "🕹️", "💾", "🪙", "⭐"];
export function Memory({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<{ v: string; flipped: boolean; matched: boolean }[]>([]);
  const [pick, setPick] = useState<number[]>([]);

  useEffect(() => {
    const deck = [...EMOJIS, ...EMOJIS]
      .map((v) => ({ v, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  useEffect(() => {
    if (pick.length !== 2) return;
    const [a, b] = pick;
    const next = [...cards];
    if (cards[a].v === cards[b].v) {
      next[a].matched = true; next[b].matched = true;
      setCards(next); setPick([]);
      if (next.every((c) => c.matched)) setTimeout(onWin, 400);
    } else {
      setTimeout(() => {
        next[a].flipped = false; next[b].flipped = false;
        setCards(next); setPick([]);
      }, 700);
    }
  }, [pick]);

  const flip = (i: number) => {
    if (cards[i].flipped || cards[i].matched || pick.length === 2) return;
    const next = [...cards]; next[i].flipped = true;
    setCards(next); setPick([...pick, i]);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((c, i) => (
        <button key={i} onClick={() => flip(i)}
          className={`w-14 h-14 sm:w-16 sm:h-16 pixel-corners flex items-center justify-center text-2xl transition ${
            c.flipped || c.matched ? "bg-gradient-neon" : "glass"
          }`}>
          {(c.flipped || c.matched) && c.v}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Mini Snake ---------------- */
export function Snake({ onWin }: { onWin: () => void }) {
  const SIZE = 12, GOAL = 5;
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  const [dir, setDir] = useState<[number, number]>([1, 0]);
  const [food, setFood] = useState<[number, number]>([8, 5]);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
      };
      const d = map[e.key];
      if (d && (d[0] !== -dir[0] || d[1] !== -dir[1])) setDir(d);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir]);

  useEffect(() => {
    if (dead || won) return;
    const id = setInterval(() => {
      setSnake((s) => {
        const head: [number, number] = [s[0][0] + dir[0], s[0][1] + dir[1]];
        if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE
          || s.some(([x, y]) => x === head[0] && y === head[1])) {
          setDead(true); return s;
        }
        const ate = head[0] === food[0] && head[1] === food[1];
        const next = [head, ...s];
        if (!ate) next.pop();
        else {
          setScore((sc) => {
            const ns = sc + 1;
            if (ns >= GOAL) { setWon(true); setTimeout(onWin, 300); }
            return ns;
          });
          let nf: [number, number];
          do { nf = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]; }
          while (next.some(([x, y]) => x === nf[0] && y === nf[1]));
          setFood(nf);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, [dir, food, dead, won]);

  const restart = () => { setSnake([[5,5]]); setDir([1,0]); setFood([8,5]); setScore(0); setDead(false); setWon(false); };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-display text-xs text-glow-yellow">SCORE {score}/{GOAL}</div>
      <div className="grid bg-black/60 p-2 pixel-corners" style={{ gridTemplateColumns: `repeat(${SIZE}, 14px)`, gap: 1 }}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE, y = Math.floor(i / SIZE);
          const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
          const isHead = snake[0][0] === x && snake[0][1] === y;
          const isFood = food[0] === x && food[1] === y;
          return (
            <div key={i} className="w-3.5 h-3.5"
              style={{
                background: isHead ? "var(--neon-pink)"
                  : isSnake ? "var(--neon-cyan)"
                  : isFood ? "var(--neon-yellow)"
                  : "oklch(0.18 0.05 280)",
                boxShadow: isFood ? "0 0 8px var(--neon-yellow)" : isHead ? "0 0 6px var(--neon-pink)" : undefined,
              }} />
          );
        })}
      </div>
      {dead && (
        <button onClick={restart} className="neon-btn neon-btn-pink">Game Over — Retry</button>
      )}
      <div className="text-xs text-muted-foreground">Use arrows / WASD</div>
    </div>
  );
}
