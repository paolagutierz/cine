import {
  RESERVATION_MOCK,
} from "./types";


export const reservationMock = (selectedseats) => (dispatch) => {
  dispatch({
    type: RESERVATION_MOCK,
    payload: selectedseats,
  });
};

