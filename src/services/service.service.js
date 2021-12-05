import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://burgundy-web-app.herokuapp.com/api/service/";

class ServiceService {
  createService(service) {
    return axios.post(API_URL + "create", service, {
      headers: authHeader(),
    });
  }

  getService(serviceId) {
    return axios.get(API_URL + `get/${serviceId}`);
  }

  getServices(order, sortBy, limit) {
    var query = API_URL + "list";

    if (order || sortBy || limit) {
      query += "?";
    }

    if (order) {
      query += `order=${order}`;
    }

    if (sortBy) {
      if (order) {
        query += "&";
      }

      query += `sortBy=${sortBy}`;
    }

    if (limit) {
      if (order || sortBy) {
        query += "&";
      }

      query += `limit=${limit}`;
    }

    return axios.get(query);
  }

  getCategories() {
    return axios.get(API_URL + "categories");
  }

  searchServices(category, search) {
    var query = API_URL + "search";

    if (category || search) {
      query += "?";
    }

    if (category) {
      query += `category=${category}`;
    }

    if (search) {
      if (category) {
        query += "&";
      }

      query += `search=${search}`;
    }

    return axios.get(query);
  }

  updateService(service) {
    return axios.put(API_URL + `update/${service.id}`, service, {
      headers: authHeader(),
    });
  }

  deleteService(serviceId) {
    return axios.delete(API_URL + `delete/${serviceId}`, {
      headers: authHeader(),
    });
  }
}

export default new ServiceService();
