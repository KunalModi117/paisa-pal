import { Typography } from "@pal/components/Typography/Typography";
import { cn } from "@pal/lib/utils";
import { getFormattedCurrency, unicodeToEmoji } from "@pal/utils/util";

type BudgetCardProps = {
  emoji: string;
  color: string;
  label: string;
  budgeted: number;
  left: number;
};

export const BudgetCard = ({
  emoji,
  color,
  label,
  budgeted,
  left,
}: BudgetCardProps) => {
  const isNegative = left < 0;

  return (
    <div className="flex justify-between items-center px-4 py-3 hover:bg-muted rounded-xl transition-colors cursor-pointer p-2">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: color }}
        >
          {unicodeToEmoji(emoji)}
        </div>
        <Typography variant="p" className="text-sm font-medium">
          {label}
        </Typography>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Typography variant="muted">
          {getFormattedCurrency(budgeted)}
        </Typography>
        <Typography
          variant="p"
          className={cn(
            "font-medium px-2 py-0.5 rounded-md",
            isNegative
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-600"
          )}
        >
          {getFormattedCurrency(left)}
        </Typography>
      </div>
    </div>
  );
};
