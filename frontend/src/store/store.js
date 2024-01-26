import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTaskManagementStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
    }),
    {
      name: "task-management-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
