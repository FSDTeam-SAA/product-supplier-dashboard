import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import supplierProductsApi from "../api/products.api";
import { ProductPayload } from "../types";

export const SUPPLIER_PRODUCTS_KEY = ["supplier", "products"];

export function useSupplierProducts(supplierId?: string) {
  return useQuery({
    queryKey: [...SUPPLIER_PRODUCTS_KEY, supplierId],
    queryFn: () => supplierProductsApi.getProducts(supplierId!),
    enabled: Boolean(supplierId),
  });
}

function useProductMutation<T>(
  mutationFn: (input: T) => Promise<unknown>,
  successMessage: string,
  errorMessage: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: SUPPLIER_PRODUCTS_KEY });
    },
    onError: (err: unknown) => toast.error(err instanceof Error ? err.message : errorMessage),
  });
}

export function useCreateSupplierProduct() {
  return useProductMutation(supplierProductsApi.createProduct, "Product created successfully", "Failed to create product");
}

export function useUpdateSupplierProduct() {
  return useProductMutation(
    ({ id, product }: { id: string; product: ProductPayload }) => supplierProductsApi.updateProduct(id, product),
    "Product updated successfully",
    "Failed to update product",
  );
}

export function useDeleteSupplierProduct() {
  return useProductMutation(supplierProductsApi.deleteProduct, "Product deleted successfully", "Failed to delete product");
}
