import { Controller } from "react-hook-form";
import { AnyType } from "../../type";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@pal/lib/utils";
import { Label } from "./ui/label";

type Option = {
  label: string;
  value: string;
};

type RadioFieldProps = {
  name: string;
  control: AnyType;
  options: Option[];
  className?: string;
  orientation?: "vertical" | "horizontal";
  message?: string;
};

export function RadioField({
  name,
  control,
  options,
  className,
  orientation = "vertical",
  message,
}: RadioFieldProps) {
  const hasError = !!message;

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className={cn(
              orientation === "horizontal" ? "flex gap-4" : "space-y-2",
              className
            )}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className={hasError ? "border-destructive" : ""}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {hasError && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
