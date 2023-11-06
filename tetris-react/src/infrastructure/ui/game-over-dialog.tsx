export function GameOverDialog({ score, onRestart }: { score: number; onRestart: () => void }) {
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black/50 flex justify-center items-center">
      <div className="flex flex-col items-center bg-white rounded shadow-xl px-8 py-4">
        <div className="text-xl font-medium">Game Over</div>
        <div>Score: {score} </div>
        <button className="px-2 py-1 mt-4 rounded bg-green-500 text-white shadow" onClick={onRestart}>
          Try again!
        </button>
      </div>
    </div>
  );
}
