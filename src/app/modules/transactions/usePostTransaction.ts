import { useState } from "react";

export type TransactionFormFields = {
  amount: number;
  categoryId: string;
  createdAt: string;
  title: string;
  type: string;
};

export const usePostTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postTransactionData = async (data: TransactionFormFields) => {
    setIsLoading(true);
    const response = await fetch("/api/transactions/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result, "Transaction POST Result");
    setIsLoading(false);
    return result;
  };

  return {
    isLoading,
    postTransactionData,
  };
};
