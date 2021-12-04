import React, { Component } from "react";

import AuthService from "../services/auth.service";

class Services extends Component {
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
        Lista de servicios.
      </div>
    );
  }
}

export default Services;
