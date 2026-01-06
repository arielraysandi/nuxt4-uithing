export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.prerender || process.server) return;

  const _userData = useUserData();

  const token = _userData.value.token;
  const isLogin = to.path.startsWith("/auth/login");

  if (!token && !isLogin) {
    return navigateTo("/auth/login");
  }
});
