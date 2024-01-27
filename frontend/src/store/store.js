import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTaskManagementStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      email: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setEmail: (email) => set({ email }),
      resetStore: () =>
        set({
          accessToken: null,
          refreshToken: null,
          email: null,
        }),
    }),
    {
      name: "task-management-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
