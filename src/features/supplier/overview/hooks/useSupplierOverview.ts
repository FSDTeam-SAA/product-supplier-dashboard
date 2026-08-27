import { useQuery } from "@tanstack/react-query";
import supplierOverviewApi from "../api/overview.api";

export const SUPPLIER_OVERVIEW_KEY = ["supplier", "overview"];

export function useSupplierOverview() {
  return useQuery({
    queryKey: SUPPLIER_OVERVIEW_KEY,
    queryFn: () => supplierOverviewApi.getOverview(),
  });
}
