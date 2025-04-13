// lib/api.ts
import axios from "axios";
import { useAuthStore, UserRole } from "../store/userStore";

const API_URL = "http://34.238.122.213:1337/api";

export const api = {
  async login(email: string, password: string) {
    try {
      console.log("🔐 Intento de login para:", email);

      const localUser = useAuthStore.getState().findLocalUserByEmail(email);

      if (localUser) {
        if (localUser.password === password) {
          useAuthStore.getState().login(localUser);
          return {
            success: true,
            user: localUser,
          };
        }
        return {
          success: false,
          error: "Contraseña incorrecta",
        };
      }

      const response = await axios.get(`${API_URL}/users`, {
        params: {
          "filters[email][$eq]": email,
        },
      });

      console.log("📡 Respuesta de la API:", response.data);

      const users = response.data.data;
      if (!users || users.length === 0) {
        console.log("❌ Usuario no encontrado");
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      const userData = users[0];
      const userAttributes = userData.attributes;
      const role: UserRole = email.includes("admin") ? "admin" : "user";

      const user = {
        id: userData.id,
        email: userAttributes.email,
        username: userAttributes.username || email.split("@")[0],
        role,
      };

      console.log("✅ Login exitoso con Strapi:", user);
      useAuthStore.getState().login(user);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("❌ Error en login:", error);
      return {
        success: false,
        error: "Error al intentar iniciar sesión",
      };
    }
  },

  async registerLocal(userData: {
    email: string;
    password: string;
    username: string;
    role: "admin" | "user";
  }) {
    try {
      const newUser = useAuthStore.getState().registerLocalUser(userData);
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error al registrar el usuario localmente",
      };
    }
  },
};
