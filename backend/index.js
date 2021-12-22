const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cinemaRoute = require("./routes/cinema");
const movieRoute = require("./routes/movie");
const seatRoute = require("./routes/seat");
const movieShowRoute = require("./routes/movieShow");
const reservationRoute = require("./routes/reservation");
const ticketRoute = require("./routes/ticket");
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
app.use("/api/cinemas", cinemaRoute);
app.use("/api/seat", seatRoute);
app.use("/api/movieShow", movieShowRoute);
app.use("/api/reservation", reservationRoute);
app.use("/api/ticket", ticketRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
