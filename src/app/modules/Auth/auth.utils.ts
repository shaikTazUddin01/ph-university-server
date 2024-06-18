import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtpayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtpayload, secret, {
    expiresIn: expiresIn,
  });
};

export const deCodedToken =  (token: string, secret: string) => {
  return  jwt.verify(token, secret) as JwtPayload;
};
