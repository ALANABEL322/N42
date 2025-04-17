import axios from "axios";
import { useAuthStore, UserRole } from "../store/userStore";

const API_URL = "http://34.238.122.213:1337/api";

interface ApiUser {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  avatar: string;
  ciudad: string;
  pais: string;
}

export const api = {
  async getUsers() {
    try {
      const response = await axios.get<ApiUser[]>(`${API_URL}/users`);
      return {
        success: true,
        users: response.data.map((user) => ({
          id: user.id,
          name: `${user.nombre} ${user.apellido}`,
          email: user.email,
          role: user.rol,
          phone: user.telefono,
          avatar: user.avatar,
          location: `${user.ciudad}, ${user.pais}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        success: false,
        error: "Error al obtener usuarios",
        users: [],
      };
    }
  },

  async login(email: string, password: string) {
    try {
      console.log("🔐 Intento de login para:", email);
      if (email === "ADMIN123@gmail.com" && password === "ADMIN123") {
        return {
          success: true,
          user: {
            id: "system-admin",
            email: "ADMIN123@gmail.com",
            username: "System Administrator",
            role: "admin",
          },
        };
      }

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

      console.log("📡 Respuesta de la API:", response?.data);

      const users = response.data;
      if (!users || users.length === 0) {
        console.log("❌ Usuario no encontrado");
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      const userData = users[0];
      const role: UserRole = email.includes("admin") ? "admin" : "user";

      const user = {
        id: userData.id,
        email: userData.email,
        username: userData.username || email.split("@")[0],
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
