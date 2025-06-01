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
import { Typography } from "@pal/components/Typography/Typography";
import TransactionCard from "./TransactionCard";
import { groupByDate } from "@pal/utils/util";
import { TransactionSkeleton } from "./TransactionSkeleton";
import { Plus } from "lucide-react";
import { RadioField } from "@pal/components/RadioField";
import { numberRegex } from "@pal/utils/regex";
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
  const { transactions, hasNextPage, loadMore, isLoading, fetchTransactions } =
    useGetTransactions();
  const grouped = groupByDate(transactions);

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
    fetchTransactions();
    handleAddTransactionModalOpen();
  };

  return (
    <div className="flex flex-col w-full px-4">
      <PageTitle
        title="Transactions"
        subtitle="Log your transactions and keep track of your spending."
      />
      <Button
        onClick={handleAddTransactionModalOpen}
        variant="default"
        className="rounded-full !px-3 !py-3 h-fit fixed bottom-20 md:bottom-10 right-5"
      >
        <Plus className="!w-6 !h-6 text-white" />
      </Button>
      <div className="flex flex-col gap-1 mt-4">
        {Object.entries(grouped).map(([date, txns]) => (
          <div key={date} className="flex flex-col gap-2">
            <Typography variant="h6" className="text-muted-foreground">
              {date}
            </Typography>
            {txns.map(({ _id, title, amount, type, categoryId }) => (
              <TransactionCard
                key={_id}
                title={title}
                amount={amount}
                type={type}
                category={{
                  name: categoryId.name,
                  emoji: categoryId.emoji,
                  color: categoryId.color,
                }}
              />
            ))}
          </div>
        ))}
        <div ref={loaderRef}>{isLoading && <TransactionSkeleton />}</div>
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
            regexTest={numberRegex}
          />
          <RadioField
            control={control}
            name="type"
            message={errors.type?.message}
            orientation="horizontal"
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
          <Button isLoading={isPostingTransactions}>Spend</Button>
        </form>
      </Dialog>
    </div>
  );
};
