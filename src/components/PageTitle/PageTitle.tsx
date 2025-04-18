import { Typography } from "../Typography/Typography";

export const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4 mt-1">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="muted">{subtitle}</Typography>
    </div>
  );
};
