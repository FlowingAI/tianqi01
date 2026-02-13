export function WindSpeed({ windSpeed }: { windSpeed: number }) {
  return (
    <div className="flex-1 text-center px-4">
      <div className="text-4xl mb-2">💨</div>
      <div className="text-2xl font-semibold text-white">{windSpeed}</div>
      <div className="text-white/70 text-sm">km/h</div>
    </div>
  );
}
