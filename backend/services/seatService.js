import Reservation from "../models/reservation";
import Ticket from "../models/ticket";

const seatService = {};

seatService.getReservedSeats = async (movieShowId) => {
  const reservedSeats = [];
  const reservations = await Reservation.find({
    movieShow: movieShowId,
  }).exec();
  await Promise.all(
    reservations.map(async (reservation) => {
      const tickets = await Ticket.find({
        reservation: reservation.id,
      })
        .populate("seat")
        .exec();

      tickets.forEach((ticket) => {
        reservedSeats.push(ticket.seat.number);
      });
    })
  );
  return reservedSeats;
};

module.exports = seatService;
