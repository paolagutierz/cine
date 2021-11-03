import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";

export const loginStartAction = () => (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
};

export const loginSuccessAction = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user,
  });
};
export const loginFailureAction = () => (dispatch) => {
  dispatch({
    type: LOGIN_FAILURE,
  });
};

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
