import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.SENDING_MAIL,
            pass: process.env.EMAIL_PASS,
         },
    secure: false,
    });

    export const maildata=(to,subject,text,html)=>{
        const mailData={
            from: '"No Reply" <no-reply@localhost>',  // sender address
              to: to,   // list of receivers
              subject: subject,
              text: text,
              html: html,
                    }
        return mailData;
    }

