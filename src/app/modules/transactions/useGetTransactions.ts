import { useEffect, useState } from "react";

export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  categoryId: string;
  type: "income" | "expense";
  date: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Transaction[];
  page: number;
  limit: number;
  hasNextPage: boolean;
  totalPages: number;
}

export const useGetTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const getTransactions = async (pageToFetch = 1) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/transactions/get?page=${pageToFetch}`);
      const result: ApiResponse = await res.json();

      if (pageToFetch === 1) {
        setTransactions(result.data);
      } else {
        setTransactions((prev) => [...prev, ...result.data]);
      }

      setPage(result.page);
      setHasNextPage(result.hasNextPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("[GET_TRANSACTIONS_ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!hasNextPage) return;
    getTransactions(page + 1);
  };

  useEffect(() => {
    getTransactions(1);
  }, []);

  return {
    isLoading,
    transactions,
    page,
    hasNextPage,
    totalPages,
    loadMore,
    refetch: () => getTransactions(1),
  };
};
