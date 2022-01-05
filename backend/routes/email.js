const express = require("express");
const router = express.Router();
const mail = require("../services/email");

// send ticket Emails
router.post("/invitations", async (req, res) => {
  const invitations = req.body;
  const promises = invitations.map((invitation) => {
    const mailOptions = mail.createMailOptions(invitation);
    return mail
      .sendEMail(mailOptions)
      .then(() => ({
        success: true,
        msg: `la invitacion para  ${mailOptions.to} fue enviada!`,
      }))
      .catch((exception) => ({ success: false, msg: exception }));
  });

  Promise.all(promises).then((result) => res.status(201).json(result));
});
module.exports = router;
