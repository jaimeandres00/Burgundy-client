import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import ServicesService from "../services/service.service";
import CategoryService from "../services/category.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es obligatorio.
      </div>
    );
  }
};

const vtitle = (value) => {
  if (value.length < 10 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 10 y 80 caracteres en el campo del nombre del servicio.
      </div>
    );
  }
};

const vdescription = (value) => {
  if (value.length < 10 || value.length > 150) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese entre 10 y 150 caracteres en la descripción del servicio.
      </div>
    );
  }
};

const vprice = (value) => {
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese un precio del servicio valido.
      </div>
    );
  }
};

const vcategory = (value) => {
  if (value === "Categoría del servicio") {
    return (
      <div className="alert alert-danger" role="alert">
        Ingrese una categoría para el servicio valida.
      </div>
    );
  }
};

const UpdateService = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const params = useParams();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      if (user.role !== 0) {
        setUser(user.id);
        setCurrentUser(user);
        setIsAdmin(user.role === 2);
        setIsServiceProvider(user.role === 1);
        retrieveService(user.id);
        retrieveCategories();
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const retrieveService = (userId) => {
    ServicesService.getService(params.id)
      .then((response) => {
        if (response.data.user !== userId) {
          navigate("/");
        } else {
          setId(response.data._id);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setPrice(response.data.price);
          setCategory(response.data.category);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCategories = () => {
    CategoryService.getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (checkBtn.current.context._errors.length === 0) {
      let service = new FormData();

      service.append("title", title);
      service.append("description", description);
      service.append("price", price);
      service.append("category", category);
      service.append("user", user);
      service.append("image", image);

      ServicesService.updateService(id, service).then(
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

  const handleDeleteService = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading2(true);

    ServicesService.deleteService(id).then(
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

        setLoading2(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <Fragment>
      {!currentUser && !isAdmin && !isServiceProvider && navigate("/login")}

      <div className="text-center row align-items-center justify-content-center mt-3 pt-3 no-row">
        <div>
          <h1 className="display-6 fw-bold">Editar servicio</h1>
        </div>
        <div className="mt-sm-5 mb-sm-5 container w-50 w-xs-100  rounded shadow">
          <div className="row bg-white align-items-stretch p-5">
            <div className="col-12">
              <Form onSubmit={handleUpdateService} ref={form}>
                <div className="mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Nombre del servicio"
                    value={title}
                    onChange={onChangeTitle}
                    validations={[vtitle]}
                  />
                </div>

                <div className="mb-3 form-group">
                  <TextArea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Descripción del servicio"
                    value={description}
                    onChange={onChangeDescription}
                    rows="3"
                    validations={[vdescription]}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Precio del servicio"
                    value={price}
                    onChange={onChangePrice}
                    validations={[vprice]}
                  />
                </div>

                <div className="mb-3">
                  <Select
                    className="form-control"
                    name="category"
                    onChange={onChangeCategory}
                    validations={[vcategory]}
                  >
                    {categories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                  </Select>
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Selecciona la imagen del servicio
                  </label>
                  <Input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={onChangeImage}
                    validations={[required]}
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-burgundy me-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Actualizar servicio</span>
                  </button>
                </div>

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
              <Form onSubmit={handleDeleteService} ref={form}>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-burgundy me-2"
                    disabled={loading2}
                  >
                    {loading2 && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Eliminar servicio</span>
                  </button>
                </div>
              </Form>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateService;
