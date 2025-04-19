import { Skeleton } from "@pal/components/ui/skeleton";

export function TransactionCardSkeleton() {
  return (
    <div className="flex items-center justify-between w-full px-1 py-2 hover:bg-muted/50 rounded-lg transition">
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />

        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 h-4 rounded-md" />
          <Skeleton className="w-16 h-3 rounded-md" />
        </div>
      </div>

      <Skeleton className="w-12 h-4 rounded-md" />
    </div>
  );
}
