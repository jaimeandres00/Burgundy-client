import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Slide from "./components/slide.component";
import ListServices from "./components/listServices.component";

import Login from "./components/login.component";
import Register from "./components/register.component";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Slide />

        <Routes>
          <Route path="/" element={<ListServices />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default App;
