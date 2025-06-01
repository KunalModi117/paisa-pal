import { Controller } from "react-hook-form";
import { AnyType } from "../../type";
import { Input } from "./ui/input";

type InputFieldProps = {
  name: string;
  control: AnyType;
  placeholder?: string;
  className?: string;
  message?: string;
  type?: string;
  regexTest?: RegExp; // <-- new prop
};

export function InputField({
  name,
  control,
  placeholder,
  className,
  message,
  type = "text",
  regexTest, // <-- destructure it
}: InputFieldProps) {
  const hasError = !!message;

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`${
              hasError ? "border-destructive ring-destructive/50" : ""
            } ${className}`}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!regexTest || regexTest.test(value) || value === "") {
                field.onChange(value);
              }
            }}
          />
        )}
      />
      {hasError && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
