import { useState } from "react";
import {
  loginStartAction,
  loginSuccessAction,
  loginFailureAction,
  logoutAction,
} from "../../store/actions/loginActions";
import { signUpNotificationDisplayed } from "../../store/actions/signUpActions";
import { connect } from "react-redux";
import "./login.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loginState,
  isSignUpSuccess,
  signUpNotificationDisplayed,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (isSignUpSuccess) {
      signUpNotificationDisplayed();
    }

    loginStart();
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      console.log(response.data);
      loginSuccess(response.data);
    } catch (error) {
      loginFailure();
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper"></div>
      </div>
      <div className="container">
        <form>
          {signUpNotificationDisplayed && (
            <small>
              {""}
              <b></b>
            </small>
          )}
          <h1>Iniciar Sesion</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Iniciar Sesion
          </button>
          <span>
            Aun no estas registrado? <Link to="/signup">Registrarme</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginStart: () => dispatch(loginStartAction()),
    loginSuccess: (user) => dispatch(loginSuccessAction(user)),
    loginFailure: () => dispatch(loginFailureAction()),
    logout: () => dispatch(logoutAction()),
    signUpNotificationDisplayed: () => dispatch(signUpNotificationDisplayed()),
  };
};

const mapStateToProps = (state) => {
  return {
    loginState: state.login,
    isSignUpSuccess: state.signup.isSignUpSuccess,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
