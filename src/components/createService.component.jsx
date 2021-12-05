import React, { Component } from "react";
import { Navigate } from "react-router-dom";

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

class CreateService extends Component {
  constructor(props) {
    super(props);

    this.handleCreateService = this.handleCreateService.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    const user = AuthService.getCurrentUser();

    if (!user || user.role === 0) {
      this.state = {
        redirect: true,
      };
    } else {
      this.state = {
        service: {
          title: "",
          description: "",
          price: 0,
          category: "",
          user: user.id,
          image: null,
        },
        categories: [],
        loading: false,
        successful: false,
        redirect: false,
        message: "",
      };
    }
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  onChangeTitle(e) {
    const title = e.target.value;
    
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        title: title
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        description: description
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        price: price
      }
    }));
  }

  onChangeCategory(e) {
    const category = e.target.value;
    
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        category: category
      }
    }));
  }

  onChangeImage(e) {
    const image = e.target.files[0];
    
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        image: image
      }
    }));
  }

  retrieveCategories() {
    CategoryService.getCategories()
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleCreateService(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      let service = new FormData();

      service.append("title", this.state.service.title);
      service.append("description", this.state.service.description);
      service.append("price", this.state.service.price);
      service.append("category", this.state.service.category);
      service.append("user", this.state.service.user);
      service.append("image", this.state.service.image);

      ServicesService.createService(service).then(
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
    const { successful, redirect, service, categories } = this.state;

    if (successful) {
      return <Navigate to={{ pathname: "/" }} />;
    }

    if (redirect) {
      return <Navigate to={{ pathname: "/login" }} />;
    }

    return (
      <div className="text-center row align-items-center justify-content-center mt-3 pt-3 no-row">
        <div>
          <h1 className="display-6 fw-bold">Crear tu servicio</h1>
        </div>
        <div className="mt-sm-5 mb-sm-5 container w-50 w-xs-100  rounded shadow">
          <div className="row bg-white align-items-stretch p-5">
            <div className="col-12">
              <Form
                onSubmit={this.handleCreateService}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Nombre del servicio"
                    value={service.title}
                    onChange={this.onChangeTitle}
                    validations={[required, vtitle]}
                  />
                </div>

                <div className="mb-3 form-group">
                  <TextArea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Descripción del servicio"
                    value={service.description}
                    onChange={this.onChangeDescription}
                    rows="3"
                    validations={[required, vdescription]}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Precio del servicio"
                    value={service.price}
                    onChange={this.onChangePrice}
                    validations={[required, vprice]}
                  />
                </div>

                <div className="mb-3">
                  <Select
                    className="form-control"
                    name="category"
                    onChange={this.onChangeCategory}
                    validations={[required]}
                  >
                    <option selected>Categoría del servicio</option>
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
                    onChange={this.onChangeImage}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-burgundy me-2"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Crear servicio</span>
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

export default CreateService;
