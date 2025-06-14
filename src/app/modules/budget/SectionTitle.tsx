import { Typography } from "@pal/components/Typography/Typography";
import { getFormattedCurrency } from "@pal/utils/util";

interface SectionTitleProps {
  title: string;
  budgeted: number;
  left: number;
}

export const SectionTitle = ({ title, budgeted, left }: SectionTitleProps) => {
  return (
    <div className="flex justify-between items-center p-4 border border-dashed border-accent rounded-2xl">
      <div className="text-sm flex gap-1 justify-center items-center">
        {title}
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
