import { TAdmin } from "./admin.interface";
import Admin from "./admin.model";

const findAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const findSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const updateAdminInToDB=async(id : string,payload :Partial<TAdmin>)=>{

  const result= await Admin.findOneAndUpdate({id},payload,{
    new:true
  })
  return result
}
const deleteAdminIntoDB = async (id: string) => {
  const result = await Admin.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
    }
  );
  console.log(result);
  return result;
};

export const AdminServices = {
  // createFacultyInToDB,
  findAllAdminFromDB,
  findSingleAdminFromDB,
  deleteAdminIntoDB,
  updateAdminInToDB
};
