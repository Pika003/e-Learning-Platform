
import nodemailer from "nodemailer"


export const Sendmail =async function(email,subject,message){


const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  secure: true, // Use `true` for port 465, `false` for all other ports
  port:465,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

 const receiver={
    from: process.env.SMTP_EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line 
    html: message // html body
}

  console.log(email,subject,message);
  try {
    const info = await transporter.sendMail(receiver);
    console.log('email sent:', info.response);
    return { success: true, message: 'Forget password email sent successfully' };
} catch (error) {
    console.error('Error sending  email:', error);
    return { success: false, error: 'Error sending  email' };
}

}