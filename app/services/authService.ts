import type { UserData } from "~/types/auth";

export async function userLogin(username: string, password: string) {
  const { post } = useApi();
  return await post<UserData>({
    url: "/v1/auth/login",
    params: {
      username: username,
      password: password
    }
  });
}
