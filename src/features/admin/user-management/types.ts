export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  createdAt: string;
  profileImage?: string;
}

export interface UserListFilter {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}
