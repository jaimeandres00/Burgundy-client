import axios from "axios";

const API_URL = "https://burgundy-web-app.herokuapp.com/api/auth/";

class AuthService {
  
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.authToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register", {
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      birthdate: user.birthdate,
      gender: user.gender,
      email: user.email,
      password: user.password
    })
    .then((response) => {
      if (response.data.authToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
