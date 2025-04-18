"use client";

import { Dialog } from "@pal/components/Dialog";
import { PageTitle } from "@pal/components/PageTitle/PageTitle";
import { Button } from "@pal/components/ui/button";
import { useReactHookForm } from "@pal/hooks/useReactHookForm";
import { useState } from "react";
import { addTransactionSchema } from "./addTransactionSchema";
import { InputField } from "@pal/components/InputField";
import { SelectField } from "@pal/components/SelectField";
import { useGetCategories } from "./useGetCategories";
import { DateField } from "@pal/components/DateField";
import { usePostTransaction } from "./usePostTransaction";
import { toast } from "sonner";
import { useGetTransactions } from "./useGetTransactions";
import { useInfiniteScroll } from "@pal/hooks/useInfiniteScroll";

interface TransactionFields {
  title: string;
  type: string;
  amount: string;
  date: Date;
  category: string;
}

export const Transactions = () => {
  const [isAddTransactionsModalOpen, setIsAddTransactionsModalOpen] =
    useState(false);
  const { control, errors, handleSubmit } =
    useReactHookForm(addTransactionSchema);
  const { categories, isLoading: isCategoriesLoading } = useGetCategories();
  const { isLoading: isPostingTransactions, postTransactionData } =
    usePostTransaction();
  const { transactions, hasNextPage, loadMore, isLoading } =
    useGetTransactions();
  const loaderRef = useInfiniteScroll({ loadMore, hasNextPage, isLoading });

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const handleAddTransactionModalOpen = () => {
    setIsAddTransactionsModalOpen(!isAddTransactionsModalOpen);
  };
  const onFormSubmit = async (data: TransactionFields) => {
    await postTransactionData({
      amount: parseInt(data.amount),
      categoryId: data.category,
      createdAt: data.date.toISOString(),
      title: data.title,
      type: data.type,
    });
    toast.success("Transaction logged successfully");
    handleAddTransactionModalOpen();
  };

  return (
    <div className="flex flex-col w-full px-4">
      <PageTitle
        title="Transactions"
        subtitle="Log your transactions and keep track of your spending."
      />
      <Button onClick={handleAddTransactionModalOpen}>Add Transaction</Button>
      <div>
        {transactions.map((tx) => (
          <div key={tx._id}>{tx._id}</div>
        ))}
        <div ref={loaderRef}>
          {isLoading && <p className="text-muted">Loading more...</p>}
        </div>
      </div>
      <Dialog
        isOpen={isAddTransactionsModalOpen}
        setIsOpen={handleAddTransactionModalOpen}
        title="Add Transaction"
        description="Add a new transaction to your account."
      >
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <InputField
            control={control}
            name="title"
            message={errors.title?.message}
            placeholder="Transaction For"
          />
          <InputField
            control={control}
            name="amount"
            message={errors.amount?.message}
            placeholder="Amount"
          />
          <SelectField
            control={control}
            name="type"
            message={errors.type?.message}
            placeholder="Type"
            options={[
              { label: "Income", value: "income" },
              { label: "Expense", value: "expense" },
            ]}
          />
          <SelectField
            control={control}
            name="category"
            message={errors.category?.message}
            placeholder="Category"
            options={categoryOptions}
            isLoading={isCategoriesLoading}
          />
          <DateField
            control={control}
            name="date"
            placeholder="Select date"
            message={errors.date?.message}
          />
          <Button isLoading={isPostingTransactions}>Submit</Button>
        </form>
      </Dialog>
    </div>
  );
};
