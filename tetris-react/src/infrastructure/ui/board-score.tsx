export function BoardScore({ score }: { score: number }) {
  return (
    <div className="absolute w-32 right-0 -mr-36 -mt-2 shadow-xl h-fit p-2 rounded bg-white text-center">
      <div className="bg-gray-200 p-2">
        <div className="text-lg font-light">Score</div>
        <div className="text-5xl">{score}</div>
      </div>
    </div>
  );
}
