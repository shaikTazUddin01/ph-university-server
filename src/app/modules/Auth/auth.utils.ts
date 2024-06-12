import jwt from "jsonwebtoken";



export const createToken = (
  jwtpayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
 return jwt.sign(jwtpayload, secret, {
    expiresIn: expiresIn,
  });
};
