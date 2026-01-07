// export type AuthResponse = {
//   data: UserData
// };

export type UserData = {
  token: string | null;
  user: User | null;
  role: Role | null;
  permissions: string[];
};

export type User = {
  id: string;
  sso_user_id: number;
  name: string;
  nik: string;
  active: boolean;
}

export type Role = {
  id: number;
  name: string
}
