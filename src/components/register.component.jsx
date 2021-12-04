import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es obligatorio.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese menos de 50 caracteres en el campo del nombre.
      </div>
    );
  }
};

const vlastname = (value) => {
  if (value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese menos de 50 caracteres en el campo del apellido.
      </div>
    );
  }
};

const vphone = (value) => {
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese un número de celular valido.
      </div>
    );
  }

  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese menos de 40 dígitos en el campo del número de celular.
      </div>
    );
  }
};

const vbirthdate = (value) => {};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una dirección de correo electrónico valida.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 8 y 40 caracteres.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    const user = AuthService.getCurrentUser();

    this.state = {
      name: "",
      lastname: "",
      phone: "",
      birthdate: "",
      email: "",
      gender: "",
      password: "",
      loading: false,
      message: "",
    };

    if (user) {
      this.state = {
        successful: true,
      };
    } else {
      this.state = {
        successful: false,
      };
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeBirthdate(e) {
    this.setState({
      birthdate: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      const user = {
        name: this.state.name,
        lastname: this.state.lastname,
        phone: this.state.phone,
        birthdate: this.state.birthdate,
        gender: this.state.gender,
        email: this.state.email,
        password: this.state.password,
      };

      AuthService.register(user).then(
        () => {
          this.setState({
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { successful } = this.state;

    if (successful) {
      return <Navigate to={{ pathname: "/" }} />;
    }

    return (
      <div className="text-center row align-items-center justify-content-center mt-3 pt-3 no-row">
        <div>
          <h1 className="display-6 fw-bold">Regístrate</h1>
        </div>

        <div className="mt-sm-5 mb-sm-5 container w-50 w-xs-100 rounded shadow">
          <div className="row bg-white align-items-stretch p-5">
            <div className="col-12">
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nombre"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      validations={[required, vname]}
                    />
                  </div>

                  <div className="col-md-6">
                    <Input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder="Apellido"
                      value={this.state.lastname}
                      onChange={this.onChangeLastName}
                      validations={[required, vlastname]}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Número de celular"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, vphone]}
                  />
                </div>

                <div className="row mb-3">
                  <label htmlFor="birthdate" className="form-label">
                    Fecha de nacimiento
                  </label>
                  <Input
                    type="date"
                    className="form-control"
                    name="birthdate"
                    value={this.state.birthdate}
                    onChange={this.onChangeBirthdate}
                    validations={[required, vbirthdate]}
                  />
                </div>

                <div className="row mb-3">
                  <Select
                    className="form-control"
                    name="gender"
                    onChange={this.onChangeGender}
                    validations={[required]}
                  >
                    <option selected>Sexo</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </Select>
                </div>

                <div className="row mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Correo electrónico"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="row mb-3">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="" id="policies" required />
                  <label className="form-check-label ms-1" for="policies">
                    Acepto los términos y condiciones, la política de privacidad
                    y el aviso legal.
                  </label>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-burgundy"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Registrarse</span>
                  </button>
                </div>
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
