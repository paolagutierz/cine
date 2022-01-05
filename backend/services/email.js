const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.createMailOptions = (data) => {
  const { to, movie, date, time, cinema, seat } = data;

  const htmlContent = `
                <h1><strong>Invitation For Movie</strong></h1>
                <p>Hi, You have been invited to: </p>
                <p>Movie name: ${movie}</p>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Cinema name: ${cinema}</p>
                <p>Cinema seat: ${seat}</p>
                <br/>
              `;
  return {
    from: "geosimos91@gmail.com",
    to,
    subject: "Cinema + Invitation",
    html: htmlContent,
  };
};

transporter.sendEMail = function (mailRequest) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
};

module.exports = transporter;
