import { CategoryFormFields } from "./Budgets";
import { useState } from "react";

export const usePostCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postCategoryData = async (data: CategoryFormFields) => {
    setIsLoading(true);
    const response = await fetch("/api/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result, "result");
    setIsLoading(false);
    return result;
  };

  return {
    isLoading,
    postCategoryData,
  };
};
