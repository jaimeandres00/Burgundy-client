import React, { useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";

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

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una dirección de correo electrónico valida.
      </div>
    );
  }
};

const vgender = (value) => {
  if (value === "Sexo") {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una género valido.
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

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeBirthdate = (e) => {
    const birthdate = e.target.value;
    setBirthdate(birthdate);
  };

  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const user = {
        name: name,
        lastname: lastname,
        phone: phone,
        birthdate: birthdate,
        gender: gender,
        email: email,
        password: password,
      };

      AuthService.register(user).then(
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

      <div className="text-center row align-items-center justify-content-center mt-3 pt-3 no-row">
        <div>
          <h1 className="display-6 fw-bold">Regístrate</h1>
        </div>

        <div className="mt-sm-5 mb-sm-5 container w-50 w-xs-100 rounded shadow">
          <div className="row bg-white align-items-stretch p-5">
            <div className="col-12">
              <Form onSubmit={handleRegister} ref={form}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Nombre"
                      value={name}
                      onChange={onChangeName}
                      validations={[required, vname]}
                    />
                  </div>

                  <div className="col-md-6">
                    <Input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder="Apellido"
                      value={lastname}
                      onChange={onChangeLastName}
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
                    value={phone}
                    onChange={onChangePhone}
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
                    value={birthdate}
                    onChange={onChangeBirthdate}
                    validations={[required]}
                  />
                </div>

                <div className="row mb-3">
                  <Select
                    className="form-control"
                    name="gender"
                    onChange={onChangeGender}
                    validations={[required, vgender]}
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
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>

                <div className="row mb-3">
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={onChangePassword}
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
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Registrarse</span>
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
