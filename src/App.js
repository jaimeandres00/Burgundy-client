import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Navbar from "./components/navbar.component";
import Slide from "./components/slide.component";
import Footer from "./components/footer.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import ListServices from "./components/services.component";
import CreateServiceButton from "./components/createServiceButton.component";
import CreateService from "./components/createService.component";
import UpdateService from "./components/updateService.component";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsServiceProvider(user.role === 1);
      setIsAdmin(user.role === 2);
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Slide />

      <CreateServiceButton />

      <Routes>
        <Route path="/:search" element={<ListServices />} />
        <Route path="/" element={<ListServices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/update-service/:id" element={<UpdateService />} />
      </Routes>

      <Footer />
    </Fragment>
  );
};

export default App;
