import api from "../services/apiService";

class Locations {
  constructor() {
    this.api = api
    this.countries = null;
    this.cities = null;
    this.airlines = null
    this.shortCitiesList = null;
  }

  async init() {
    const response = await Promise.all([api.countries(), api.cities(), api.airlines()]);
    const [countries, cities, airlines] = response;
    this.countries = countries;
    this.cities = cities;
    // this.airlines = airlines

    this.shortCitiesList = this.cities.reduce((acc, city) => {
      acc[city.code] = city;
      return acc;
    }, {});

    this.airlines = airlines.reduce((acc, airline) => {
      acc[airline.code] = airline
      return acc
    }, {})
    return response;
  }

  async fetchTickets(params){
    return await this.api.prices(params)
  }

}

const locations = new Locations();

export default locations;
