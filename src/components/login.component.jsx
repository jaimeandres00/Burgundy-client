import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una dirección de correo electrónico valida.
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    const user = AuthService.getCurrentUser();

    this.state = {
      email: "",
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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
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
      <div className="text-center row align-items-center mt-5 no-row">
        <div>
          <h1 className="display-6 fw-bold">Inicio de sesión</h1>
        </div>
        <div className="container w-25 w-xs-100 bg-white rounded shadow p-5 rounded mt-sm-5 mb-sm-5 ">
          <div className="row">
            <div className="col">
              <Form
                onSubmit={this.handleLogin}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="mb-3">
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

                <div className="mb-3">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
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
                    <span>Iniciar sesión</span>
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
                <div className="mt-3">
                  <p>
                    No tienes una cuenta aún,{" "}
                    <Link to="/register" className="text-secondary">
                      registrate aquí
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
