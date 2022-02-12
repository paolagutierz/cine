import { useState } from "react";
import {
  signUpFailureAction,
  signUpStartAction,
  signUpSuccessAction,
} from "../store/actions/signUpActions";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import bgcine from "../img/bgcine.jpg";
//materialUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

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
  const [documentType, setDocumentType] = useState("1");
  const [documentNumb, setDocumentNumb] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);

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
    if (documentNumb === "") {
      setError({
        text: "Ingresa el numero de documento",
        input: "documentNumb",
      });
      return false;
    } else if (!validateDocument()) {
      return false;
    } else if (firstname === "") {
      setError({
        text: "Ingresa tu nombre",
        input: "firstname",
      });
    } else if (!validateNameLastName()) {
      return false;
      return false;
    } else if (lastname === "") {
      setError({
        text: "Ingresa tu apellido",
        input: "lastname",
      });
      return false;
    } else if (!validateNameLastName()) {
      return false;
    } else if (email === "") {
      setError({
        text: "Ingresa tu email",
        input: "email",
      });
      return false;
    } else if (!validateEmail()) {
      return false;
    } else if (password === "") {
      setError({
        text: "Ingresa la contraseña",
        input: "password",
      });
      return false;
    } else if (password2 === "") {
      setError({
        text: "Confirma la contraseña",
        input: "password2",
      });
      return false;
    } else if (!validatePassword()) {
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const validateNameLastName = () => {
    const pattern = /^[A-Z][a-z]{1,15}$/;
    if (!pattern.test(firstname, lastname)) {
      setError({
        text: "Ingresa solo letras",
        input: "firstname",
      });
      return false;
    }
  };

  const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (!pattern.test(password)) {
      setError({
        text: "Longitud mínima 5, y debe contener mayúsculas, minúsculas y números.",
        input: "password",
      });
      return false;
    }

    if (password !== password2) {
      setError({
        text: "Las contraseñas no coinciden",
        input: "password",
      });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (pattern.test(email)) {
      return true;
    } else {
      setError({ text: "Ingresa un email valido", input: "email" });
      return false;
    }
  };

  const validateDocument = () => {
    const pattern = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/;
    if (pattern.test(documentNumb)) {
      return true;
    } else {
      setError({
        text: "Ingresa un numero de documento valido",
        input: "documentNumb",
      });
      return false;
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgcine})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSignUp}
              sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel id="document-type-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    labelId="document-type-label"
                    name="documentType"
                    onChange={(e) => setDocumentType(e.target.value)}
                    fullWidth
                    autoFocus
                    value={documentType}>
                    <MenuItem value="1">Cedula</MenuItem>
                    <MenuItem value="2">Tarjeta de identidad</MenuItem>
                    <MenuItem value="3">NIT</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="documentNumb"
                    label="Numero de documento"
                    onChange={(e) => setDocumentNumb(e.target.value)}
                    error={error?.input === "documentNumb"}
                    helperText={error?.input === "documentNumb" && error.text}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="firstname"
                    label="Nombre"
                    onChange={(e) => setFirstname(e.target.value)}
                    error={error?.input === "firstname"}
                    helperText={error?.input === "firstname" && error.text}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="lastname"
                    label="Apellido"
                    onChange={(e) => setLastname(e.target.value)}
                    error={error?.input === "lastname"}
                    helperText={error?.input === "lastname" && error.text}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Correo electronico"
                    onChange={(e) => setEmail(e.target.value)}
                    error={error?.input === "email"}
                    helperText={error?.input === "email" && error.text}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={error?.input === "password"}
                    helperText={error?.input === "password" && error.text}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Verifique la contraseña"
                    type="password"
                    onChange={(e) => setPassword2(e.target.value)}
                    error={error?.input === "password2"}
                    helperText={error?.input === "password2" && error.text}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    id="signupbutton"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isFetching}>
                    Registrarme
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  Ya tienes una cuenta?
                  <Link href="/login" variant="body2">
                    {" Ingresa aca."}
                  </Link>
                </Grid>
              </Grid>
              {apiError && (
                <Alert severity="error">
                  Hubo un error al registrarse, intenta nuevamente.
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
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
