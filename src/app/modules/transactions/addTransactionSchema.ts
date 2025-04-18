import { date, object, string } from "zod";
export const addTransactionSchema = object({
  title: string().min(1, "Title is required"),
  type: string().min(1, "Type is required"),
  amount: string().min(1, "Amount is required"),
  date: date({ required_error: "Date is required" }),
  category: string().min(1, "Category is required"),
});
