import { useState } from "react";
import {
  loginStartAction,
  loginSuccessAction,
  loginFailureAction,
  logoutAction,
} from "../store/actions/loginActions";
import { signUpNotificationDisplayed } from "../store/actions/signUpActions";
import axios from "axios";
import { connect } from "react-redux";
import bgcine from "../img/bgcine.jpeg";
//materialUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const Login = ({
  loginStart,
  loginSuccess,
  loginFailure,
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
      loginSuccess(response.data);
    } catch (error) {
      loginFailure();
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
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {loginState?.error && (
              <Alert severity="error">Email o Contraseña incorrecta!</Alert>
            )}
            {isSignUpSuccess && (
              <Alert severity="success">Su registro fue exitoso!</Alert>
            )}
            <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loginState?.isFetching}>
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item>
                  Aun no estas registrado?
                  <Link href="/signup" variant="body2">
                    {" Registrarse"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
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
