import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const CreateServiceButton = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.role === 2);
      setIsServiceProvider(user.role === 1);
    }
  }, []);

  return (
    <Fragment>
      {currentUser && isAdmin && (
        <Link
          to={"/create-service"}
          className="btn btn-success btn-fixed btn-md"
        >
          <i class="bi bi-plus-circle"></i> Crear servicio
        </Link>
      )}
    </Fragment>
  );
};

export default CreateServiceButton;
