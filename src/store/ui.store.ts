import { create } from "zustand";

export interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  unreadNotificationsCount: number;
  setUnreadNotificationsCount: (count: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  activeModal: null,
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  unreadNotificationsCount: 0,
  setUnreadNotificationsCount: (count) => set({ unreadNotificationsCount: count }),
}));

export default useUIStore;
