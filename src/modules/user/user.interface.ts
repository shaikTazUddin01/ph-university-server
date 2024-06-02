export type Tuser = {
  id: string;
  password: string;
  newPasswordChange?: boolean;
  role: "student" | "admin" | "faculty";
  status: 'in-progress'|'blocked';
  isDeleted: boolean;
};


// export type NewUser={
//   password:string;
//   role:string;
//   id:string
// }