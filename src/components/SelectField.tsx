import { Controller } from "react-hook-form";
import { AnyType } from "../../type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react"; // You can use any spinner you like

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  name: string;
  control: AnyType;
  options: Option[];
  placeholder?: string;
  className?: string;
  message?: string;
  isLoading?: boolean;
};

export function SelectField({
  name,
  control,
  options,
  placeholder = "Select an option",
  className = "",
  message,
  isLoading = false,
}: SelectFieldProps) {
  const hasError = !!message;

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isLoading}
          >
            <SelectTrigger
              className={`w-full ${
                hasError && "border-destructive ring-destructive/50"
              } ${className}`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin size-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    Loading...
                  </span>
                </div>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {hasError && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
