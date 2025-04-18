import { useEffect, useState } from "react";

interface Category {
  userId: string;
  name: string;
  emoji: string;
  color: string;
  type: string;
  _id: string;
}

export const useGetCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    setIsLoading(true);
    fetch("/api/category/get", { method: "GET" })
      .then(async (res) => {
        const response = await res.json();
        setCategories(response);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    isLoading,
    getCategories,
    categories,
  };
};
