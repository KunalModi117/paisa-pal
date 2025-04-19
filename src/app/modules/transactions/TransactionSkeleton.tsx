import { Skeleton } from "@pal/components/ui/skeleton";
import { TransactionCardSkeleton } from "./TransactionCardSkeleton";

export function TransactionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="w-32 h-4 rounded-md" />
          <div className="space-y-4">
            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
              (_, j) => (
                <TransactionCardSkeleton key={j} />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
