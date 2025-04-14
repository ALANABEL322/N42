import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
  isSystemAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  localUsers: User[];
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
  role: UserRole | null;
  loginSystemAdmin: () => void;
  login: (user: User) => void;
  registerLocalUser: (user: Omit<User, "id">) => User;
  logout: () => void;
  findLocalUserByEmail: (email: string) => User | undefined;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      localUsers: [],
      isAuthenticated: false,
      role: null,
      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin" || user?.email === "ADMIN123@gmail.com";
      },
      isUser: () => get().user?.role === "user",
      isSystemAdmin: () => get().user?.isSystemAdmin === true,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          role: user.role,
        }),

      loginSystemAdmin: () => {
        const systemAdmin: User = {
          id: "system-admin",
          email: "ADMIN123@gmail.com",
          username: "System Administrator",
          role: "admin",
          isSystemAdmin: true,
        };

        set({
          user: systemAdmin,
          isAuthenticated: true,
          role: "admin",
        });
      },

      registerLocalUser: (newUser) => {
        const user = {
          ...newUser,
          id: `local-${Date.now()}`,
        };

        set((state) => ({
          localUsers: [...state.localUsers, user],
        }));

        return user;
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          role: null,
        }),

      findLocalUserByEmail: (email) => {
        return get().localUsers.find((user) => user.email === email);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
