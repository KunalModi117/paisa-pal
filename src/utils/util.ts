import { format, isToday, isYesterday } from "date-fns";
import { Transaction } from "@pal/app/modules/transactions/useGetTransactions";

export const unicodeToEmoji = (unicode: string) => {
  try {
    return String.fromCodePoint(
      ...unicode
        .split("U+")
        .filter(Boolean)
        .map((u) => parseInt(u, 16))
    );
  } catch {
    return "❓";
  }
};

export const getFormattedCurrency = (value: number) => {
  return `₹${value}`;
};

type GroupedTransactions = {
  [date: string]: Transaction[];
};

export function groupByDate(transactions: Transaction[]): GroupedTransactions {
  return transactions.reduce((acc, txn) => {
    const dateObj = new Date(txn.createdAt);

    let displayDate = "";
    if (isToday(dateObj)) {
      displayDate = "Today";
    } else if (isYesterday(dateObj)) {
      displayDate = "Yesterday";
    } else {
      displayDate = format(dateObj, "EEE, MMMM d");
    }

    if (!acc[displayDate]) acc[displayDate] = [];
    acc[displayDate].push(txn);
    return acc;
  }, {} as GroupedTransactions);
}
