import { IFilterTransactionParams } from "@entrypoint/v1/transaction/models";
import { Prisma } from "@prisma/client";

const handleCustomObject = (
  filter: Partial<IFilterTransactionParams>,
): Prisma.TransactionFindManyArgs["where"] | null => {
  if (filter.startDate) return { date: { gte: filter.startDate } };
  if (filter.endDate) return { date: { lte: filter.endDate } };
  if (filter.categoryId) return { categoryId: filter.categoryId };
  return null;
};

export const handleFindFilter = (
  filter: Partial<IFilterTransactionParams>,
): Prisma.TransactionFindManyArgs["where"] => {
  const filterList = Object.keys(filter).map((key) => {
    const defaultFilter = {
      [key]: filter[key as keyof IFilterTransactionParams],
    };

    const customObject = handleCustomObject({
      [key]: filter[key as keyof IFilterTransactionParams],
    });

    return customObject || defaultFilter;
  });

  return { AND: filterList };
};
