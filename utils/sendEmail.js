const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: process.env.SMTP_PORT || '2525',
  auth: {
    user: process.env.SMTP_USERNAME || 'fc0b90bff8db18',
    pass: process.env.SMTP_PASSWORD || '222f322d4e204e',
  }
});


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) =>{
  // send mail with defined transport object
  
  const message = {
    from: `${process.env.FROM_EMAIL || 'noreply@anil.io'} <${process.env.FROM_NAME ||'devcamper' }>`, // sender address
    to: options.email, // list of receivers
    subject:options.subject, // Subject line
    text: options.message, // plain text body
  }
  console.log(message)
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;