import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  isFetching: false,
  error: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default LoginReducer;
