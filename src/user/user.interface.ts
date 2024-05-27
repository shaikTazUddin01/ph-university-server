export type Tuser = {
  id: string;
  password: string;
  newPasswordChange: boolean;
  role: "user" | "admin" | "faculty";
  status: 'in-progress'|'blocked';
  isDeleted: boolean;
};
