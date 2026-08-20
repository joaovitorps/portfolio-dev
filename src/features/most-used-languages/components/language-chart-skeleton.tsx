export function LanguageChartSkeleton() {
  const skeletonIds = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center h-64">
        <div className="w-40 h-40 rounded-full bg-muted animate-pulse" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {skeletonIds.map((id) => (
          <div key={id} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0 bg-muted animate-pulse" />
            <div className="flex-1 h-4 bg-muted rounded animate-pulse" />
            <div className="w-8 h-4 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
