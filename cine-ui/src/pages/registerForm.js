import React, { Component } from "react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentType: "0",
      documentNumber: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      password2: "",
      error: "",
      success: false,
      terms: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateData = this.validateData.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    //
  }

  validateData() {
    debugger;
    if (this.state.documentType === "" || this.state.documentType === "0") {
      this.setState({ error: "Selecciona el tipo de documento" });
      return false;
    } else if (this.state.documentNumber === "") {
      this.setState({ error: "Ingresa el numero de documento" });
      return false;
    } else if (this.state.name === "") {
      this.setState({ error: "Ingresa tu nombre" });
      return false;
    } else if (this.state.surname === "") {
      this.setState({ error: "Ingresa tu apellido" });
      return false;
    } else if (this.state.email === "") {
      this.setState({ error: "Ingresa tu email" });
      return false;
    } else if (!this.validateEmail()) {
      return false;
    } else if (this.state.password === "") {
      this.setState({ error: "Ingresa la contraseña" });
      return false;
    } else if (this.state.password2 === "") {
      this.setState({ error: "Confirma la contraseña" });
      return false;
    } else if (!this.validatePassword()) {
      return false;
    } else if (!this.state.terms) {
      this.setState({ error: "Debes aceptar los terminos y condiciones" });
      return false;
    } else {
      this.setState({ error: "" });
      return true;
    }
  }

  validateEmail() {
    const pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (pattern.test(this.state.email)) {
      return true;
    } else {
      this.setState({ error: "Ingresa un email valido" });
      return false;
    }
  }

  validatePassword() {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (!pattern.test(this.state.password)) {
      this.setState({
        error:
          "La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números. ",
      });
      return false;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({
        error: "Las contraseñas no coinciden",
      });
      return false;
    }
    return true;
  }

  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked //? operador ternario
        : event.target.value;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <section className="vh-100">
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center  align-items-center h-100">
            <div className="col-sm-5">
              {this.state.error !== "" && (
                <div class="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              )}
              <div className="card bg-danger">
                <div className="card-body">
                  <h1 className="h1 mb-3 mt-2 text-light text-center font-weight-normal">
                    Registrarme{" "}
                  </h1>

                  <div className="form-floating mb-2 mx-3">
                    <select
                      className="form-select"
                      aria-label="Tipo de documento"
                      onChange={this.handleInputChange}
                      value={this.state.documentType}
                      name="documentType">
                      <option value="0">Tipo de documento</option>
                      <option value="1">Cedula</option>
                      <option value="2">Tarjeta de identidad</option>
                      <option value="3">NIT</option>
                      <option value="4">Pasaporte</option>
                    </select>
                  </div>

                  <div className="form-floating mb-2 mx-3">
                    <input
                      type="number"
                      className="form-control"
                      id="document"
                      placeholder="Numero de documento"
                      onChange={this.handleInputChange}
                      value={this.state.documentNumber}
                      name="documentNumber"
                    />
                    <label for="document">Numero de documento</label>
                  </div>
                  <div className="form-floating mb-2 mx-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="nombre"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                      name="name"
                    />
                    <label for="name">Nombre</label>
                  </div>
                  <div className="form-floating mb-2 mx-3">
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      placeholder="apellido"
                      onChange={this.handleInputChange}
                      value={this.state.surname}
                      name="surname"
                    />
                    <label for="surname">Apellido</label>
                  </div>

                  <div className="form-floating mb-2 mx-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      onChange={this.handleInputChange}
                      value={this.state.email}
                      name="email"
                    />
                    <label for="email">Correo Electronico</label>
                  </div>
                  <div className="form-floating mb-2 mx-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                      value={this.state.password}
                      name="password"
                    />
                    <label for="password">Contraseña</label>
                  </div>
                  <div className="form-floating mb-2  mx-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password2"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                      value={this.state.password2}
                      name="password2"
                    />
                    <label for="password2">Confirmacion de la contraseña</label>
                  </div>

                  <div className="form-check d-flex justify-content-center mt-2 mb-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="terms"
                      onChange={this.handleInputChange}
                      value={this.state.terms}
                      name="terms"
                    />
                    <label className="form-check-label text-light" for="terms">
                      {" "}
                      Acepto terminos y condiciones{" "}
                    </label>
                  </div>

                  <div className="form-check text-light d-flex justify-content-center mb-2 ">
                    <button
                      type="button"
                      onClick={this.handleSubmit}
                      className="btn btn-outline-warning text-light btn-lg w-50">
                      Registrarme
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

export default RegisterForm;
