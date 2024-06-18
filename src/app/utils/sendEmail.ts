import nodemailer from "nodemailer";
import config from "../config";
// import config from "../config";

export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:  config.node_env=='production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tazahmedsoft@gmail.com",
      pass: "osid xlum aojj vsuv",
    },
  });


  await transporter.sendMail({
    from: "tazahmedsoft@gmail.com", // sender address
    to: "skaiktazuddin@gmail.com", // list of receivers
    subject: "Password change koro ! na hoi moro !", // Subject line
    text: "Hello ki khobor ? password bhule giso", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

};
