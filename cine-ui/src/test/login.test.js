/* eslint-disable jest/valid-expect */
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import Login from "../pages/Login";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const mockStore = configureStore();
let store;

describe("<Login /> test integracion con redux", () => {
  it("Verificar texto de alerta cuando falla la API", () => {
    store = mockStore({
      login: { error: true, isFetching: false },
      signup: { isSignUpSuccess: false, isFetching: false },
    });
    const wrapper = mount(<Login store={store} />);
    expect(wrapper.find(Alert).text()).to.equal(
      "Email o Contraseña incorrecta!"
    );
  });

  it("Verificar boton esta deshabilitado cuando se llama la API", () => {
    store = mockStore({
      login: { error: false, isFetching: true },
      signup: { isSignUpSuccess: true, isFetching: false },
    });
    const wrapper = mount(<Login store={store} />);
    expect(wrapper.find(Button).props().disabled).to.equal(true);
  });

  it("Verificar alerta luego de registro exitoso", () => {
    store = mockStore({
      login: { error: false, isFetching: false },
      signup: { isSignUpSuccess: true, isFetching: false },
    });
    const wrapper = mount(<Login store={store} />);
    expect(wrapper.find(Alert).text()).to.equal("Su registro fue exitoso!");
  });
});
