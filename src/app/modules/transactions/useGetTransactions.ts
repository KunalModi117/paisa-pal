import { useEffect, useState } from "react";

interface Category {
  name: string;
  emoji: string;
  color: string;
  type: string;
  _id: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  categoryId: Category;
  type: "income" | "expense";
  date: string;
  title: string;
  createdAt: string;
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
    fetchTransactions: () => getTransactions(1),
  };
};
