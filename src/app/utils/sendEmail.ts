import nodemailer from "nodemailer";
import config from "../config";
// import config from "../config";

export const sendEmail = async (to:string,html:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:  config.node_env=='production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tazahmedsoft@gmail.com",
      pass: config.send_email_pass,
    },
  });


  await transporter.sendMail({
    from: "tazahmedsoft@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within 10 mints", // Subject line
    text: "Reset your password within 10 mins", // plain text body
    html, // html body
  });

};
