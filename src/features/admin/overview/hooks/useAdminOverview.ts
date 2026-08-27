import { useQuery } from "@tanstack/react-query";
import adminOverviewApi from "../api/overview.api";

export const ADMIN_OVERVIEW_KEY = ["admin", "overview"];

export function useAdminOverview() {
  return useQuery({
    queryKey: ADMIN_OVERVIEW_KEY,
    queryFn: () => adminOverviewApi.getOverviewData(),
  });
}

export function useAdminRevenueChart(year?: number) {
  return useQuery({
    queryKey: ["admin", "revenue-chart", year],
    queryFn: () => adminOverviewApi.getChartData(year),
  });
}
