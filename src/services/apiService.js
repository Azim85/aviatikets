import axios from "axios";
import config from "../config/apiconfig";

class Api {
  constructor(config) {
    this.url = config.url;
  }

  /**
   * ENPOINTS:
   * countries -> Array of countries
   * cities -> Array of cities
   * prices/cheap  -> Array of ....
   */

  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async airlines(){
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return response.data
    }catch(err){
      return Promise.reject(err)
    }
  }

  async prices(params) {
     try {
       const response = await axios.get(`${this.url}/prices/cheap`, {params});
       return response.data;
     } catch (err) {
       return Promise.reject(err);
     }
  }
}

const api = new Api(config);

export default api;
