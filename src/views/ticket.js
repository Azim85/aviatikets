import formUi from "./formControls";
import take_of from '../assets/images/takeoff-the-plane.png'
import take_down from '../assets/images/plane-landing.png'

class TicketUi {
  constructor() {
    this.ticket = document.querySelector("#ticket");
  }

  getTicket(response) {
    this.ticket.innerHTML = "";
    Object.values(response).forEach((value) => {
      const {
        company,
        origin,
        destination,
        departure_at,
        return_at,
        flight_number,
        logo,
        price,
        transfers,
      } = value;

      const ui = `
            <div class="card p-4 m-3 col-5">
                <h5 class="d-flex justify-content-between align-items-center">
                  <span>${company}</span>
                  <img src="${logo}"/>
                </h5>
                <div class="d-flex justify-content-between align-items-center ">
                  <p>${origin}<img src="${take_of}" width="30px"/></p>
                  <i class="bi bi-arrow-right mx-5"></i>
                  <p><img src="${take_down}" width="30px"/>  ${destination}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <small>Departure at:<span class="ms-4">${departure_at}</span></small>
                  <small>Return_at: ${return_at}</small>
                </div>
                
                <small>Flight number: ${flight_number}</small>
                <small>Transfer: ${transfers}</small>
                <p><strong>Price: ${price} ${formUi.currency.value}</strong></p>
               
            </div>
        `;
      this.ticket.insertAdjacentHTML("afterbegin", ui);
    });
  }
}

const ticketUi = new TicketUi();

export default ticketUi;
