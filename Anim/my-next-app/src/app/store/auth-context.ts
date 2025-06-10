/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface AuthState {
  session: any;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  setSession: (session: any) => void;
  setAccessToken: (token: string, expiresAt: number) => void;
  setRefreshToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  session: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  setSession: (session) => set({ session }),
  setAccessToken: (token, expiresAt) => {
    set({ accessToken: token, expiresAt });
  },
  setRefreshToken: (token) => set({ refreshToken: token }),
  clearAuth: () =>
    set({
      session: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    }),
}));

export default useAuthStore;
