import locations from "../store/locations";

class FormUi {
  constructor() {
    this.form = document.forms["submitForm"];
    this.departInput = this.form.elements["depart"];
    this.returnInput = this.form.elements["destination"];
    this.departDate = this.form.elements["date-depart"];
    this.returnDate = this.form.elements["date-destination"];
    this.originUl = document.querySelector(".origin-cities");
    this.returnUl = document.querySelector(".destination-cities");
    this.originCode = null
    this.returnCode = null
    this.currency = document.querySelector('.currency')
  }

  originSearch(cities, countries, val) {
    this.originUl.innerHTML = "";
    this.originUl.style.display = 'block'
    const citiesList = cities.filter((city) =>
      city.name_translations.en.startsWith(val)
    );
    citiesList.forEach((city) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      countries.forEach((country) => {
        if (city.country_code === country.code) {
          li.textContent = `${city.name}, ${country.name}`;
        }
      });
      
      this.originCode = citiesList[0].code
      this.originUl.insertAdjacentElement("afterbegin", li);
    });
  }

  returnSearch(cities, countries, val){
    this.returnUl.innerHTML = "";
    this.returnUl.style.display = 'block'
    const citiesList = cities.filter((city) =>
      city.name_translations.en.startsWith(val)
    );
    citiesList.forEach((city) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      countries.forEach((country) => {
        if (city.country_code === country.code) {
          li.textContent = `${city.name}, ${country.name}`;
        }
      });

      this.returnCode = citiesList[0].code
      this.returnUl.insertAdjacentElement("afterbegin", li);
    });
  }

  setOriginValue(e){
    this.departInput.value = e.target.textContent
    this.originUl.style.display = 'none'
  }

  setReturnValue(e){
    this.returnInput.value = e.target.textContent
    this.returnUl.style.display = 'none'
  }

  dateFormat(date){
    return date.split('-').slice(0,2).join('-')
  }
}

const formUi = new FormUi();

export default formUi;
