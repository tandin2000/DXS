import axios from "axios";
class RestService {

  config = {
    headers: {
      Authorization: "",
      CompanyId: "",
    },
  };

 async login(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/login",
        formData
      );
      return {
        status: 200,
        data: res.data,
      };
    } catch (error) {
      if (error === 'Request failed with status code 404') {
        return {
          status: 404,
          message: "Invalid Username or Password",
        };
      } else {
        return {
          status: 500,
          message: error,
        };
      }
    }
  }

  async logout(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/logout",
        formData
      );
      return {
        status: 200,
        data: res.data,
      };
    } catch (error) {
        return {
          status: 500,
          message: error,
        };
    }
  }
}

export default new RestService();
