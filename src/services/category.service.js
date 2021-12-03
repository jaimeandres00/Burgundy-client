import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://burgundy-web-app.herokuapp.com/api/category/";

class CategoryService {
  createCategory(category) {
    return axios.post(
      API_URL + "create",
      { name: category.name },
      { headers: authHeader() }
    );
  }

  getCategories() {
    return axios.get(API_URL + "list");
  }

  getCategory(categoryId) {
    return axios.get(API_URL + `get/${categoryId}`);
  }

  updateCategory(category) {
    return axios.put(
      API_URL + `update/${category.id}`,
      { name: category.name },
      { headers: authHeader() }
    );
  }

  deleteCategory(categoryId) {
    return axios.delete(API_URL + `delete/${categoryId}`, {
      headers: authHeader(),
    });
  }
}

export default new CategoryService();
