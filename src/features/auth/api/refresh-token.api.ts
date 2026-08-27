import api from "@/lib/api";

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  accessToken: string;
  refreshToken?: string;
}

/**
 * Refreshes an expired access token using the refresh token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>("/auth/refresh-token", {
    refreshToken,
  });
  return response.data;
}
