import { defineStore } from "pinia";
import * as authService from "~/services/authService";
import type { UserData } from "~/types/auth";

export const useUserData = () => {
  const data = useLocalStorage<UserData>("user_data", {
    token: null,
    user: null,
    role: null,
    permissions: []
  });

  return data;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    formLogin: {
      username: <string>"",
      password: <string>"",
    },
    registerForm: {
      email: <string>"",
      name: <string>"",
      password: <string>"",
      confirmPassword: <string>"",
    },
    isLoading: <boolean>false
  }),
  
  actions: {
    async login() {
      const userData = useUserData();

      if(helper.isNullOrEmpty(this.formLogin.username)) {
        useSonner.error("Validation Failed", {
          description: 'Username is required.',
          richColors: true,
          duration: 3000,
        });
        return
      }

      if(helper.isNullOrEmpty(this.formLogin.password)) {
        useSonner.error("Validation Failed", {
          description: 'Password is required.',
          richColors: true,
          duration: 3000,
        });
        return
      }

      try {
        this.isLoading = true;

        const res = await authService.userLogin(
          this.formLogin.username,
          this.formLogin.password
        );

        userData.value.token = res.data.token;
        userData.value.user = res.data.user;
        userData.value.role = res.data.role;
        userData.value.permissions = res.data.permissions;

        navigateTo("/", {
          external: true
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      useUserData().value = {
        token: null,
        user: null,
        role: null,
        permissions: []
      };

      return navigateTo("/auth/login", { external: true });
    },
  },

  persist: true,
});
