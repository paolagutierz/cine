import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      success: false,
    };
  }

  render() {
    return (
      <section className="vh-100">
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-sm-5">
              <div className="card bg-danger">
                <div className="card-body">
                  <h1 className="h1 mb-4 mt-3 text-light text-center font-weight-normal">
                    Iniciar Sesion{" "}
                  </h1>

                  <div className="form-floating mb-3 mx-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label for="email">Correo Electronico</label>
                  </div>
                  <div className="form-floating mx-3">
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Password"
                    />
                    <label for="Password">Contraseña</label>
                  </div>

                  <div className="form-check d-flex justify-content-center mt-3 mb-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="terms"
                    />
                    <label
                      className="form-check-label text-light"
                      for="terms"
                      required>
                      {" "}
                      Acepto terminos y condiciones{" "}
                    </label>
                  </div>

                  <div>
                    <label className="form-check d-flex justify-content-center mb-3 text-light ">
                      ¿No tienes una cuenta?{" "}
                      <a href="/signup" className="text-warning">
                        Registrarse
                      </a>{" "}
                    </label>
                  </div>

                  <div className="form-check text-light d-flex justify-content-center mb-3 ">
                    <button
                      type="button"
                      className="btn btn-outline-warning text-light btn-lg w-50">
                      Ingresar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
