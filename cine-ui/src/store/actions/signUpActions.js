import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_NOTIFICATION_DISPLAYED,
} from "./types";

export const signUpStartAction = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_START,
  });
};

export const signUpSuccessAction = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_SUCCESS,
  });
};
export const signUpFailureAction = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_FAILURE,
  });
};

export const signUpNotificationDisplayed = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_NOTIFICATION_DISPLAYED,
  });
};
