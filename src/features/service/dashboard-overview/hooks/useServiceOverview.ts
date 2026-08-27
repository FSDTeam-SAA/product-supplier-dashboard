import { useQuery } from "@tanstack/react-query";
import serviceOverviewApi from "../api/overview.api";

export const SERVICE_OVERVIEW_KEY = ["service", "overview"];

export function useServiceOverview() {
  return useQuery({
    queryKey: SERVICE_OVERVIEW_KEY,
    queryFn: () => serviceOverviewApi.getOverviewStats(),
  });
}
