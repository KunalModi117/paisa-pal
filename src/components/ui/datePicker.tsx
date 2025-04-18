"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@pal/components/ui/popover";
import { Calendar } from "@pal/components/ui/calendar";
import { Button } from "@pal/components/ui/button";

type DatePickerProps = {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DatePicker({
  date,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            onChange(selected);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
