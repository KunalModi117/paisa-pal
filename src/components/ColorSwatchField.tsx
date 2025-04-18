"use client";

import { Controller } from "react-hook-form";
import { Check } from "lucide-react";
import { AnyType } from "../../type";
import { cn } from "@pal/lib/utils";

type ColorSwatchFieldProps = {
  name: string;
  control: AnyType;
  colors?: string[];
  className?: string;
  message?: string;
};

const defaultColors = [
  "#A11D33",
  "#A11D65",
  "#9C27B0",
  "#7B1FA2",
  "#512DA8",
  "#1565C0",
  "#00796B",
  "#2E7D32",
  "#FBC02D",
  "#BF360C",
  "#C62828",
  "#6D4C41",
  "#263238",
  "#303F9F",
  "#388E3C",
];

export function ColorSwatchField({
  name,
  control,
  colors = defaultColors,
  className = "",
  message,
}: ColorSwatchFieldProps) {
  const hasError = !!message;

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={cn("grid grid-cols-5 gap-x-2 gap-y-2 w-full", className)}
          >
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                  field.value === color
                    ? "ring-2 ring-offset-2 ring-black border-white"
                    : "border-transparent",
                  hasError && "ring-1 ring-destructive"
                )}
                style={{ backgroundColor: color }}
                onClick={() => field.onChange(color)}
              >
                {field.value === color && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
        )}
      />
      {hasError && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
