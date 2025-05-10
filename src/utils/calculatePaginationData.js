export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    const totalItems = count;
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
