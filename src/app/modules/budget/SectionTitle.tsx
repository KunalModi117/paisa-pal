import { Typography } from "@pal/components/Typography/Typography";
import { getFormattedCurrency } from "@pal/utils/util";

interface SectionTitleProps {
  title: string;
  daysLeft: number;
  budgeted: number;
  left: number;
}

export const SectionTitle = ({
  title,
  daysLeft,
  budgeted,
  left,
}: SectionTitleProps) => {
  return (
    <div className="flex justify-between items-center p-4 border border-dashed border-accent rounded-2xl">
      <div className="text-sm flex gap-1 justify-center items-center">
        {title}
        <Typography variant="muted" className="ml-2 text-xs">
          {daysLeft} days left
        </Typography>
      </div>
      <div className="flex text-sm">
        <div className="mr-2 flex gap-1">
          Budgeted:
          <Typography variant="muted" className="font-medium">
            {getFormattedCurrency(budgeted)}
          </Typography>
        </div>
        <div className="flex gap-1">
          Left:
          <Typography variant="muted" className="font-medium">
            {getFormattedCurrency(left)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
