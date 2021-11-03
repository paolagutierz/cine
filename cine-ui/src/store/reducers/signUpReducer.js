import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_NOTIFICATION_DISPLAYED,
} from "../actions/types";

const initialState = {
  isSignUpSuccess: false,
  isFetching: false,
  error: false,
};

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_START:
      return {
        ...state,
        isSignUpSuccess: false,
        isFetching: true,
        error: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignUpSuccess: true,
        isFetching: false,
        error: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSignUpSuccess: false,
        isFetching: false,
        error: true,
      };
    case SIGN_UP_NOTIFICATION_DISPLAYED:
      return {
        ...state,
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default SignUpReducer;
