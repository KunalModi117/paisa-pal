import { Typography } from "@pal/components/Typography/Typography";
import { getFormattedCurrency, unicodeToEmoji } from "@pal/utils/util";

type TransactionCardProps = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: {
    name: string;
    emoji: string;
    color: string;
  };
};

const TransactionCard = ({
  title,
  amount,
  type,
  category,
}: TransactionCardProps) => {
  const { name, emoji, color } = category;

  return (
    <div className="flex items-center justify-between w-full hover:bg-muted rounded-xl transition-colors cursor-pointer p-2">
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: color }}
        >
          {unicodeToEmoji(emoji)}
        </div>
        <div className="flex flex-col">
          <Typography variant="p" className="text-sm font-medium">
            {title}
          </Typography>
          <Typography variant="p" className="text-xs text-muted-foreground">
            {name}
          </Typography>
        </div>
      </div>

      <Typography
        variant="p"
        className="text-sm font-medium text-muted-foreground flex gap-1"
      >
        <span className={type === "income" ? "text-green-500" : "text-red-500"}>
          {type === "income" ? "+" : "-"}
        </span>
        {getFormattedCurrency(amount)}
      </Typography>
    </div>
  );
};

export default TransactionCard;
