const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTRO
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    documentType: req.body.documentType,
    documentNumb: req.body.documentNumb,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const info = await newUser.save();
    const { password, ...userInfo } = info._doc;
    return res.status(201).json(userInfo);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong password or username!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        documentNumb: user.documentNumb,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
