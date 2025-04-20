import { date, object, string } from "zod";

export const addBudgetSchema = object({
  categoryId: string().min(1, "Category is required"),
  amount: string({
    required_error: "Amount is required",
  }).min(1, "Amount must be greater than zero"),
  frequency: string().min(1, "Frequency is required"),
  startDate: date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid date format",
  }),
});
