import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supplierProductsApi from "../api/products.api";
import { CreateProductInput, SupplierProduct } from "../types";
import { toast } from "sonner";

export const SUPPLIER_PRODUCTS_KEY = ["supplier", "products"];

export function useSupplierProducts() {
  return useQuery({
    queryKey: SUPPLIER_PRODUCTS_KEY,
    queryFn: () => supplierProductsApi.getProducts(),
  });
}

export function useCreateSupplierProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => supplierProductsApi.createProduct(data),
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: SUPPLIER_PRODUCTS_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to create product");
    },
  });
}

export function useDeleteSupplierProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => supplierProductsApi.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: SUPPLIER_PRODUCTS_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete product");
    },
  });
}
