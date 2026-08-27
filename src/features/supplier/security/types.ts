export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    current: boolean;
  }[];
}
