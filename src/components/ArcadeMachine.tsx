import { useState } from "react";
import { ACHIEVEMENTS, useApp } from "@/lib/store";
import { TicTacToe, Memory, Snake } from "./MiniGames";

type GameKey = "tictactoe" | "memory" | "snake";

const GAME_REWARDS: Record<GameKey, string[]> = {
  tictactoe: ["unity", "csharp", "ts"],
  memory: ["react", "tailwind", "html", "css"],
  snake: ["nestjs", "symfony", "java", "kotlin", "android", "swiftui", "php", "js"],
};

export function ArcadeMachine() {
  const { t, store, unlock } = useApp();
  const [game, setGame] = useState<GameKey | null>(null);
  const [reward, setReward] = useState<string | null>(null);

  const onWin = () => {
    if (!game) return;
    const candidates = GAME_REWARDS[game].filter((id) => !store.unlocked.includes(id));
    const id = candidates[0] ?? GAME_REWARDS[game][0];
    unlock(id);
    setReward(id);
    setTimeout(() => setReward(null), 2200);
  };

  return (
    <div id="arcade" className="relative max-w-md mx-auto">
      {/* Cabinet */}
      <div className="relative bg-gradient-arcade pixel-corners pt-4 pb-6 px-4 shadow-[var(--shadow-arcade)] border border-[oklch(0.4_0.15_320_/_0.6)]">
        {/* Marquee */}
        <div className="text-center mb-3">
          <div className="inline-block px-6 py-2 bg-black/60 pixel-corners border border-[var(--neon-pink)] crt-flicker">
            <div className="font-display text-sm text-glow-pink">ARCADE.DEV</div>
          </div>
        </div>

        {/* Screen */}
        <div className="crt-screen crt-scanlines p-4 min-h-[340px] flex flex-col items-center justify-center relative">
          {reward ? (
            <RewardSplash id={reward} />
          ) : !game ? (
            <div className="text-center w-full fade-up">
              <div className="font-display text-[10px] text-glow-yellow mb-3">★ {t.selectGame} ★</div>
              <div className="grid gap-2">
                <GameBtn label={t.games.tictactoe} onClick={() => setGame("tictactoe")} />
                <GameBtn label={t.games.memory} onClick={() => setGame("memory")} />
                <GameBtn label={t.games.snake} onClick={() => setGame("snake")} />
              </div>
              <div className="mt-4 text-[10px] text-muted-foreground blink">{t.insertCoin}</div>
            </div>
          ) : (
            <div className="w-full fade-up flex flex-col items-center gap-3">
              <div className="flex items-center justify-between w-full">
                <div className="font-display text-[10px] text-glow-cyan">{t.games[game]}</div>
                <button onClick={() => setGame(null)} className="font-display text-[9px] text-glow-pink hover:underline">
                  ← {t.backToHub}
                </button>
              </div>
              {game === "tictactoe" && <TicTacToe onWin={onWin} />}
              {game === "memory" && <Memory onWin={onWin} />}
              {game === "snake" && <Snake onWin={onWin} />}
            </div>
          )}
        </div>

        {/* Joystick + buttons */}
        <div className="flex items-center justify-around mt-5 px-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-black/70 border-2 border-[var(--neon-cyan)] shadow-[0_0_18px_var(--neon-cyan)]" />
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-[var(--neon-pink)] to-[var(--neon-purple)] rounded-full" />
          </div>
          <div className="flex gap-2">
            {["pink", "yellow", "cyan", "green"].map((c) => (
              <div key={c}
                className="w-7 h-7 rounded-full border border-black/60"
                style={{ background: `var(--neon-${c})`, boxShadow: `0 0 10px var(--neon-${c})` }} />
            ))}
          </div>
        </div>

        {/* Coin slot */}
        <div className="mt-4 mx-auto w-24 h-3 rounded-sm bg-black/70 border border-[var(--neon-yellow)]" />
      </div>

      {/* Stand */}
      <div className="mx-auto w-3/4 h-6 bg-gradient-to-b from-[oklch(0.18_0.05_280)] to-[oklch(0.1_0.04_280)] rounded-b-2xl border-x border-b border-[var(--neon-pink)]/40" />
    </div>
  );
}

function GameBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="neon-btn neon-btn-pink w-full">
      ▶ {label}
    </button>
  );
}

function RewardSplash({ id }: { id: string }) {
  const { t } = useApp();
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  return (
    <div className="text-center scale-in">
      <div className="font-display text-[10px] text-glow-yellow mb-2">★ {t.rewardUnlocked} ★</div>
      <div className="text-6xl mb-3 neon-pulse">{ach?.icon}</div>
      <div className="font-display text-sm text-glow-pink">{ach?.title}</div>
      <div className="text-xs mt-1 text-glow-cyan">{ach?.category}</div>
      <div className="mt-4 text-[10px] text-muted-foreground blink">{t.completed}</div>
    </div>
  );
}
