import React, { useState, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una dirección de correo electrónico valida.
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {currentUser && navigate("/")}

      <div className="text-center row align-items-center mt-5 no-row">
        <div>
          <h1 className="display-6 fw-bold">Inicio de sesión</h1>
        </div>

        <div className="container w-25 w-xs-100 bg-white rounded shadow p-5 rounded mt-sm-5 mb-sm-5">
          <div className="row">
            <div className="col">
              <Form onSubmit={handleLogin} ref={form}>
                <div className="mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-burgundy"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Iniciar sesión</span>
                  </button>
                </div>
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />

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
    </Fragment>
  );
};

export default Login;
