export interface ServiceItem {
  _id: string;
  id?: string;
  serviceName: string;
  title?: string;
  description?: string;
  price: number;
  duration: number | string;
  location?: boolean | string;
  status: "active" | "deactivate" | "Active" | "Inactive";
  serviceProviderId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServiceInput {
  serviceName: string;
  description?: string;
  price: number;
  duration: number;
  location?: boolean;
  status?: "active" | "deactivate";
}
