/* eslint-disable jest/valid-expect */
import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import SignUp from "../pages/Signup";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const mockStore = configureStore();
let store;

describe("<SignUp /> test integracion con redux", () => {
  it("Verificar texto de alerta cuando falla la API", () => {
    store = mockStore({ signup: { error: true, isFetching: false } });
    const wrapper = mount(<SignUp store={store} />);
    expect(wrapper.find(Alert).text()).to.equal(
      "Hubo un error al registrarse, intenta nuevamente."
    );
  });

  it("Verificar boton esta deshabilitado cuando se llama la API", () => {
    store = mockStore({ signup: { error: false, isFetching: true } });
    const wrapper = mount(<SignUp store={store} />);
    expect(wrapper.find(Button).props().disabled).to.equal(true);
  });
});
