import { GET_RESERVATIONS, GET_RESERVATION_SEATS } from "../actions/types";
import { setAlert } from "./alert";

export const getReservations = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/reservations";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const reservations = await response.json();
    if (response.ok) {
      dispatch({ type: GET_RESERVATIONS, payload: reservations });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const getReservationSeats = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/seat";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const reservationSeats = await response.json();
    if (response.ok) {
      dispatch({
        type: GET_RESERVATION_SEATS,
        payload: reservationSeats,
      });
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
  }
};

export const addReservation = (reservation) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/reservations";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    if (response.ok) {
      const { reservation } = await response.json();
      dispatch(setAlert("Reserva creada", "success", 5000));
      return {
        status: "success",
        message: "Reserva creada",
        data: { reservation },
      };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " La reserva no fue creada,intenta de nuevo.",
    };
  }
};

export const updateReservation = (reservation, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/reservations/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    if (response.ok) {
      dispatch(setAlert("Reservation Updated", "success", 5000));
      return { status: "success", message: "Reservation Updated" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " Reservation have not been updated, try again.",
    };
  }
};

export const cancelReservation = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const url = "/reservations/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(setAlert("Reserva cancelada", "success", 5000));
      return { status: "success", message: "Reserva cancelada" };
    }
  } catch (error) {
    dispatch(setAlert(error.message, "error", 5000));
    return {
      status: "error",
      message: " la reserva no pudo ser eliminada.",
    };
  }
};
