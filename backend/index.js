const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movie");
const reservationRoute = require("./routes/reservation");

const email = require("./services/email/email");
const config = require("./services/email/config.json");

const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conectada"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/reservations", reservationRoute);
app.use("api/email", email);
app.listen(5000, () => {
  console.log("Backend server is running!");
});
