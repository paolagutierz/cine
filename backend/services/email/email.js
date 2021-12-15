var nodemailer = require("nodemailer");
var config = require("../email/config.json");
const express = require("express");
const router = express.Router();

//send
router.post("/", (req, res) => {
  const body = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.password,
    },
  });

  var mailOptions = {
    from: config.email.details.from,
    to: body.to,
    subject: config.email.details.subject,
    text: config.email.details.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(info);
    }
  });
});

module.exports = router;
