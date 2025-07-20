import useLocalStorage from "./useLocalStorage";

export type SortField = "id" | "name";
export type SortOrder = "asc" | "desc";

export interface SortState {
  field: SortField;
  order: SortOrder;
}

const useSortPersistence = () => {
  const [sortField, setSortField] = useLocalStorage<SortField>(
    "pokemon-sort-field",
    "id"
  );
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>(
    "pokemon-sort-order",
    "asc"
  );

  const setSorting = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getGraphQLOrderBy = () => {
    return [{ [sortField]: sortOrder }];
  };

  return {
    sortField,
    sortOrder,
    setSorting,
    toggleSort,
    getGraphQLOrderBy,
  };
};

export default useSortPersistence;
