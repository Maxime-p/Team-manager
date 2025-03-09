import { directus } from './directus';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        try {
          await directus.auth.login({ email, password });
          const user = await directus.users.me.read();
          set({ isAuthenticated: true, user });
        } catch (error) {
          console.error('Erreur de connexion:', error);
          throw error;
        }
      },
      register: async (email: string, password: string) => {
        try {
          await directus.users.createOne({
            email,
            password,
            role: 'member', // Assurez-vous que ce rôle existe dans Directus
          });
          await directus.auth.login({ email, password });
          const user = await directus.users.me.read();
          set({ isAuthenticated: true, user });
        } catch (error) {
          console.error('Erreur d\'inscription:', error);
          throw error;
        }
      },
      logout: async () => {
        try {
          await directus.auth.logout();
          set({ isAuthenticated: false, user: null });
        } catch (error) {
          console.error('Erreur de déconnexion:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);