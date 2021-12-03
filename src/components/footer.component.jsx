import React, { Component } from "react";
import { Link } from "react-router-dom"

class Footer extends Component {
  render() {
    return (
      <div className="row no-row bg-burgundy pt-4 pb-3 text-center">
        <div className="col">
          <div className="container">
            <div className="row no-row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <Link className="text-light" to="/">
                  ¿Quiénes somos?
                </Link>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <Link className="text-light" to="/">
                  Ayuda / PQR
                </Link>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <Link className="text-light" to="/">
                  Términos y condiciones
                </Link>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <p className="text-light">
                  <i className="bi bi-facebook"></i> |{" "}
                  <i className="bi bi-instagram"></i> |{" "}
                  <i className="bi bi-whatsapp"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
