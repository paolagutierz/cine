import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  signUpFailureAction,
  signUpStartAction,
  signUpSuccessAction,
} from "../../store/actions/signUpActions";
import logocine from "../../img/logocine.png";
import "./signUp.scss";

const Signup = ({
  signUpFailure,
  signUpStart,
  signUpSuccess,
  isFetching,
  apiError,
}) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumb, setDocumentNumb] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateData()) {
      return;
    }

    signUpStart();

    const user = {
      email,
      password,
      documentType,
      documentNumb,
      firstname,
      lastname,
    };

    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      signUpSuccess();
      history.push("/login");
    } catch (error) {
      signUpFailure();
    }
  };

  const validateData = () => {
    if (documentType === "" || documentType === "0") {
      setError("Selecciona el tipo de documento");
      return false;
    } else if (documentNumb === "") {
      setError("Ingresa el numero de documento");
      return false;
    } else if (firstname === "") {
      setError("Ingresa tu nombre");
      return false;
    } else if (lastname === "") {
      setError("Ingresa tu apellido");
      return false;
    } else if (email === "") {
      setError("Ingresa tu email");
      return false;
    } else if (!validateEmail()) {
      return false;
    } else if (password === "") {
      setError("Ingresa la contraseña");
      return false;
    } else if (password2 === "") {
      setError("Confirma la contraseña");
      return false;
    } else if (!validatePassword()) {
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (!pattern.test(password)) {
      setError(
        "La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números. "
      );
      return false;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (pattern.test(email)) {
      return true;
    } else {
      setError("Ingresa un email valido");
      return false;
    }
  };

  return (
    <div className="signUp">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logocine} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          {error !== "" && (
            <small className="error">
              {error}
              <b></b>
            </small>
          )}
          <h1>Registrarme</h1>
          <select
            aria-label="Tipo de documento"
            onChange={(e) => setDocumentType(e.target.value)}
            name="documentType">
            <option value="0">Tipo de documento</option>
            <option value="1">Cedula</option>
            <option value="2">Tarjeta de identidad</option>
            <option value="3">NIT</option>
          </select>
          <input
            type="text"
            placeholder="Numero de documento"
            name="documentNumb"
            onChange={(e) => setDocumentNumb(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Verifica la contraseña"
            onChange={(e) => setPassword2(e.target.value)}
          />

          {isFetching ? (
            <span>...loading</span>
          ) : (
            <button className="signUpButton" onClick={handleSignUp}>
              Registrarme
            </button>
          )}
          <b></b>
          <span>
            Ya tienes una cuenta? <Link to="/login">Ingresa aca.</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpFailure: () => dispatch(signUpFailureAction()),
    signUpStart: () => dispatch(signUpStartAction()),
    signUpSuccess: () => dispatch(signUpSuccessAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    apiError: state.signup.error,
    isFetching: state.signup.isFetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
