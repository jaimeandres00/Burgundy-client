import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://burgundy-web-app.herokuapp.com/api/user/";

class UserService {
  createUser(user) {
    return axios.post(
      API_URL + "create",
      {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        birthdate: user.birthdate,
        gender: user.gender,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      { headers: authHeader() }
    );
  }

  getUser(userId) {
    return axios.get(API_URL + `get/${userId}`, { headers: authHeader() });
  }

  searchUsers(role, search) {
    var query = API_URL + "search";

    if (role || search) {
      query += "?";
    }

    if (role) {
      query += `role=${role}`;
    }

    if (search) {
      if (role) {
        query += "&";
      }

      query += `search=${search}`;
    }

    return axios.get(query, { headers: authHeader() });
  }

  updateUser(user) {
    return axios.put(
      API_URL + `update/${user.id}`,
      {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        birthdate: user.birthdate,
        gender: user.gender,
        password: user.password,
        role: user.role,
      },
      { headers: authHeader() }
    );
  }

  deleteUser(userId) {
    return axios.delete(API_URL + `delete/${userId}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
