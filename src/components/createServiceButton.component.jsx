import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateServiceButton extends Component {
  render() {
    return (
      <div>
        <Link
          to={"create-service"}
          className="btn btn-success btn-fixed btn-md"
        >
          <i class="bi bi-plus-circle"></i> Crear servicio
        </Link>
      </div>
    );
  }
}

export default CreateServiceButton;
