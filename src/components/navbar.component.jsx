import React, { Fragment, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";

import logo from "../assets/burgundy-logo.png";

import AuthService from "../services/auth.service";

const Navbar = (props) => {
  const form = useRef();  
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const handleSearch = (e) =>{
    e.preventDefault();
    if(search === "") {
      navigate(`/`);
    } else {
      navigate(`/?search=${search}`);      
    }
  };

  const logOut = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();   
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-burgundy">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="Logo de Burgundy" width="150px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Form
              className="d-flex m-auto w-50"
              onSubmit={handleSearch}
              ref={form}
            >
              <Input
                type="search"
                className="form-control me-2"
                name="search"
                placeholder="Buscar servicio"
                value={search}
                onChange={onChangeSearch}
              />
              <Button className="btn btn-outline-light" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            {currentUser && 
              <a className="text-light pt-3" href="/">
                <i class="bi bi-person-circle"></i>{" "}
                {currentUser.name + " " + currentUser.lastname}
              </a>
            }
            {currentUser && 
              <button className="btn btn-outline-light m-2" onClick={logOut}>
                Cerrar sesión
              </button>
            }

            {!currentUser && 
              <a className="btn btn-outline-light" href="/login">
                Inicio de sesión
              </a>
            }
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
