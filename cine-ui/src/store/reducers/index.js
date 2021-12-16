import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import SignUpReducer from "./signUpReducer";
import reservationsReducer from "./reservationsReducer"

export default combineReducers({
  login: loginReducer,
  signup: SignUpReducer,
  reservationMock:reservationsReducer,
});
