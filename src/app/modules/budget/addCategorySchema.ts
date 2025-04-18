import { object, string } from "zod";
export const addCategorySchema = object({
  emoji: string().min(1, "Emoji is required"),
  color: string().min(1, "Color is required"),
  name: string().min(1, "Category is required"),
  type: string().min(1, "Type is required"),
});
