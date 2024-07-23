import axios from "axios";
class RestService {
 
 async POSTCompany(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/company",
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

  async POSTEmployee(formData){
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/employee",
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

  async POSTEmployeeDetails(formData){
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/employee_details",
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

  async POSTCLDC(formData){
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocationConfiguration",
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

  async POSTCLDCUser(formData){
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocationConfiguration/user",
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
  async GETCompanies() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/company"
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

  async PUTCompanies(formData, id) {
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/api/company/${id}`,
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

  async POSTLocation(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocation",
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

  async GETLocationsByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocation/companyId/${id}`
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

  async GETLocationById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocation/${id}`
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

  async DELLocationById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocation/${id}`
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

  async PUTLocationById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocation/"+id,
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

  async POSTDepartment(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyDepartment",
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

  async GETDepartmentsByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyDepartment/companyId/${id}`
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

  async GETDepartmentById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyDepartment/${id}`
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

  async PUTDepartmentById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/companyDepartment/"+id,
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

  async DELDepartmentById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/companyDepartment/${id}`
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

  async POSTCarder(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyCarder",
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

  async GETCardersByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyCarder/companyId/${id}`
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

  async GETCarderById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyCarder/${id}`
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

  async PUTCarderById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/companyCarder/"+id,
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

  async DELCarderById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/companyCarder/${id}`
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


  async POSTLocationConfiguration(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocationConfiguration",
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

  async GETLocationConfigurationByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocationConfiguration/companyId/${id}`
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

  async GETLocationConfigurationById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocationConfiguration/${id}`
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

  async PUTLocationConfigurationById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/companyLocationConfiguration/"+id,
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

  async DELLocationConfigurationById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/companyLocationConfiguration/${id}`
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

  async POSTNewUser(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/Register",
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

  async GETUsersByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/employee/companyId/${id}`
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

  async GETUsersByCompanySearch(id,params) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/employee/search/companyId/${id}`, {params}
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

  async GETAdvanceRequestData(params) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/advance_request/employeeId/${params.employee_id}/companyId/${params.company_id}`
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

  async GETAdvanceRequestDataCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/advance_request/company/${id}`
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

  async POSTAdvanceRequestData(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/api/advance_request`, formData
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
  async POSTCompanyContactDetails(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/companyContactDetails",
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

  async GETCCDByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyContactDetails/companyId/${id}`
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

  async GETCCCDById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/companyContactDetails/${id}`
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

  async PUTCCDById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/companyContactDetails/"+id,
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

  async DELCCDById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/companyContactDetails/${id}`
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

  async GETCompanySearch(params) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/company/search`, {params}
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

  async GETCompanyById(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/company/${id}`
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

  async POSTDataMapping(formData) {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/data_mapping",
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

  async GETDataMappingByCompany(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/data_mapping/companyId/${id}`
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

  async GETDataMappingById(id){
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/data_mapping/${id}`
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

  async PUTDataMappingById(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/data_mapping/"+id,
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

  async PUTAdvanceRequestApprove(formData, id){
    try {
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/api/advance_request/"+id,
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
  async DELDataMappingById(id){
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/data_mapping/${id}`
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
