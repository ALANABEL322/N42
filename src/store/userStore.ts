import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "user";

interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  localUsers: User[];
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
  role: UserRole | null;

  // Acciones
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
      isAdmin: () => get().user?.role === "admin",
      isUser: () => get().user?.role === "user",
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          role: user.role,
        }),

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