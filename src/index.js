// Project entry point

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.scss"; // init custom scss


import locations from "./store/locations";
import formUi from "./views/formControls";
import ticketUi from './views/ticket'
import {formatDate} from './helpers/date'

document.addEventListener("DOMContentLoaded", () => {
  initApp();

  const form = formUi.form;

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    onSubmit();
  });

  async function initApp() {
    await locations.init();
    console.log(locations);
    console.log(formUi);

    formUi.departInput.addEventListener("input", () => {
      formUi.originSearch(
        locations.cities,
        locations.countries,
        formUi.departInput.value
      );
    });

    formUi.returnInput.addEventListener("input", () => {
      formUi.returnSearch(
        locations.cities,
        locations.countries,
        formUi.returnInput.value
      );
    });

    formUi.originUl.addEventListener("click", (e) => {
      formUi.setOriginValue(e);
    });

    formUi.returnUl.addEventListener("click", (e) => {
      formUi.setReturnValue(e);
    });
  }

  async function onSubmit(){

    const origin = formUi.originCode
    const destination = formUi.returnCode
    const depart_date = formUi.dateFormat(formUi.departDate.value)
    const return_date = formUi.dateFormat(formUi.returnDate.value)
    const currency = formUi.currency.value

    const response = await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    })
    
    if(response.success){
      const forUi = Object.values(response.data).reduce((acc, item) => {
        item['company'] = locations.airlines[item.airline].name || locations.airlines[item.airline].name_translations.en
        item["origin"] =
          locations.shortCitiesList[item.origin].name ||
          locations.shortCitiesList[item.origin].name_translations.en;
        item["destination"] =
          locations.shortCitiesList[item.destination].name ||
          locations.shortCitiesList[item.destination].name_translations.en; 
        item["departure_at"] = formatDate(
          new Date(item.departure_at),
          "yyyy MMM dd EEE H aaa"
        ); 
        item['return_at'] = formatDate(new Date(item.return_at), "yyy MMM dd EEE HH aaa ")
        item['logo'] = `http://pics.avs.io/200/100/${item.airline}.png`
        acc[item.airline] = item
        return acc
      }, {})
      
      console.log(forUi)


      ticketUi.getTicket(forUi)
    }
  }
});
