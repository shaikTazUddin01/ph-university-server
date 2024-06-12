import dotenv from 'dotenv';


dotenv.config();

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATAbasE_URL,
  salt_round: process.env.SLAT_ROUND,
  default_pass:process.env.DEFAULT_PASS,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
