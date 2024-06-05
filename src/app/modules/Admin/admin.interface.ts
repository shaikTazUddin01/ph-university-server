

export type TAdmin = {
  id: string;
  designation: string;
  name: string;
  gender: "Male" | "Female";
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  ManagementDepartment: string;
  isDeleted:false
};
