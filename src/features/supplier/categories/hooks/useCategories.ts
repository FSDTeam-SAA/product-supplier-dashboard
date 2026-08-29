import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoriesApi from "../api/categories.api";
import { CategoryPayload } from "../types";
import { toast } from "sonner";

export const CATEGORIES_QUERY_KEY = ["supplier", "categories"];

export function useCategories(supplierId?: string) {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, supplierId],
    queryFn: () => categoriesApi.getCategories(supplierId!),
    enabled: Boolean(supplierId),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: CategoryPayload) => categoriesApi.createCategory(category),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to create category");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: CategoryPayload }) =>
      categoriesApi.updateCategory(id, category),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update category");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesApi.deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete category");
    },
  });
}
