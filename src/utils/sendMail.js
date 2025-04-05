import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: getEnvVar('SMTP_PORT'),
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASSWORD'),  
  },
});


export const sendEmail = (options) => {
  console.log(options);

  return transporter.sendMail(options);
};

