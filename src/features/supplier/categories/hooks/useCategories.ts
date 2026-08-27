import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoriesApi from "../api/categories.api";
import { ProductCategory } from "../types";
import { toast } from "sonner";

export const CATEGORIES_QUERY_KEY = ["supplier", "categories"];

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => categoriesApi.getCategories(),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Partial<ProductCategory>) => categoriesApi.createCategory(category),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to create category");
    },
  });
}
