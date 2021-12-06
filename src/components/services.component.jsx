import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AuthService from "../services/auth.service";
import ServicesService from "../services/service.service";

const ListServices = (props) => {
  const params = useParams();
  const [services, setServices] = useState([]);

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

    retrieveServices();
  }, []);

  const retrieveServices = () => {
    if (params.search) {
      ServicesService.searchServices()
        .then((response) => {
          setServices(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      ServicesService.getServices()
        .then((response) => {
          setServices(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="row">
          {services.map((service) => (
            <div className="col-md-3 col-sm-12">
              <div className="card text-center">
                <img
                  src={
                    "https://burgundy-web-app.herokuapp.com/api/service/get/image/" +
                    service._id
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <div className="">
                    <p className="d-inline me-2 lead fw-bolder">
                      {"$ " + service.price}
                    </p>
                    <a href="#" className="btn btn-burgundy">
                      Contratar
                    </a>
                  </div>

                  {(isAdmin ||
                    (isServiceProvider && currentUser.id == service.user)) && (
                    <div className="mt-2">
                      <Link
                        to={"/update-service/" + service._id}
                        className="btn btn-success me-1"
                      >
                        Editar <i class="bi bi-pencil-square"></i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ListServices;
