import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Slide from "./components/slide.component";
import Services from "./components/services.component";
import CreateServiceButton from "./components/createServiceButton.component";
import CreateService from "./components/createService.component";
import UpdateService from "./components/updateService.component";

import Login from "./components/login.component";
import Register from "./components/register.component";

import AuthService from "./services/auth.service";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isServiceProvider: false,
      isAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isServiceProvider: user.role === 1,
        isAdmin: user.role === 2,
      });
    }
  }

  render() {
    const { currentUser, isServiceProvider, isAdmin } = this.state;

    return (
      <div>
        <Navbar />
        <Slide />

        {(isAdmin || isServiceProvider) && <CreateServiceButton />}

        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/update-service/:id" element={<UpdateService />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default App;
