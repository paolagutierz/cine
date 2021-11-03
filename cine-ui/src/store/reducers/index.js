import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import SignUpReducer from "./signUpReducer";

export default combineReducers({
  login: loginReducer,
  signup: SignUpReducer,
});
