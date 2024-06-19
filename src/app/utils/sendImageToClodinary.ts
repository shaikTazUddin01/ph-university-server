import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
// import config from "../config";

export const sendImageToCloudinary = async(path:string,name) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret, // Click 'View Credentials' below to copy your API secret
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const uploadResult = await cloudinary.uploader
  .upload(
      path, {
          public_id: name,
      }
  )
  .catch((error) => {
      console.log(error);
  });

// console.log(uploadResult);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,process.cwd()+'/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })