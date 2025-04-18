import { Controller } from "react-hook-form";
import { AnyType } from "../../type";
import { DatePicker } from "./ui/datePicker";

type ControlledDatePickerProps = {
  name: string;
  control: AnyType;
  message?: string;
  placeholder?: string;
};

export function DateField({
  name,
  control,
  message,
  placeholder,
}: ControlledDatePickerProps) {
  const hasError = !!message;

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            date={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
      {hasError && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
