const config = require("../config/mail");
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: config.service,
  port: config.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.user, // generated ethereal user
    pass: config.pass // generated ethereal password
  }
});

// setup email data with unicode symbols
function mail(to, subject, text, html) {
  let mailOptions = {
    from: config.from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal accoun
  });
}

module.exports = {
  sendMail: mail
};
