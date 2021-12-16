import {
  RESERVATION_MOCK,
} from "../actions/types";

const reservationMock = (state, payload) => ({
  ...state,
  selectedseats: payload,
});

const initialState = {
  reservations: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESERVATION_MOCK:
      return reservationMock(state, payload);
    default:
      return state;
  }
};
