const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.isAdmin) return res.status(403).send("Access denied.");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};
