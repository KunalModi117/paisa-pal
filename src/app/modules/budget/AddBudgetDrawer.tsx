import { Drawer } from "@pal/components/Drawer/Drawer";
import { useReactHookForm } from "@pal/hooks/useReactHookForm";
import { addBudgetSchema } from "./addBudgetSchema";
import { toast } from "sonner";
import { SelectField } from "@pal/components/SelectField";
import { useGetCategories } from "../transactions/useGetCategories";
import { InputField } from "@pal/components/InputField";
import { RadioField } from "@pal/components/RadioField";
import { DateField } from "@pal/components/DateField";
import { Button } from "@pal/components/ui/button";
import { usePostBudget } from "./usePostBudget";
import { numberRegex } from "@pal/utils/regex";

export interface BudgetFormFields {
  categoryId: string;
  amount: string;
  frequency: string;
  startDate: Date;
}

export const AddBudgetDrawer = ({
  open,
  handleOpen,
  refetch,
}: {
  open: boolean;
  handleOpen: () => void;
  refetch: () => void;
}) => {
  const { handleSubmit, reset, control, errors } =
    useReactHookForm(addBudgetSchema);
  const { categories } = useGetCategories();
  const { isLoading, postBudget } = usePostBudget();
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const onFormSubmit = (data: BudgetFormFields) => {
    postBudget(data).then(() => {
      toast.success("Budget created successfully");
      reset();
      refetch();
      handleOpen();
    });
  };
  return (
    <Drawer
      open={open}
      onOpenChange={handleOpen}
      title="Add Budget"
      description="Set a budget for your categories"
    >
      <form
        className="flex flex-col gap-4 max-w-sm mx-auto"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <SelectField
          name="categoryId"
          control={control}
          options={categoryOptions}
          message={errors.categoryId?.message}
          placeholder="Select a category to create budget for"
        />
        <InputField
          control={control}
          name="amount"
          message={errors.amount?.message}
          placeholder="Enter budget amount"
          regexTest={numberRegex}
        />
        <RadioField
          control={control}
          name="frequency"
          message={errors.frequency?.message}
          options={[
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          orientation="horizontal"
        />
        <DateField
          control={control}
          name="startDate"
          message={errors.startDate?.message}
          placeholder="Select budget start date"
        />
        <Button isLoading={isLoading}>Submit</Button>
      </form>
    </Drawer>
  );
};
