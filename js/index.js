import Visit from "./modules/Visit.js";
import LogIn from "./LogIn.js";
import Modal from "./Modal.js";

const visit = new Visit();
const login = new LogIn();
const modal = new Modal();

const root = document.getElementById("root");
const loginModal = document.getElementById("ModalLogin");
const visitModal = document.getElementById("ModalVisit");
const btnVisit = document.getElementById("btn-visit");
const emailUser = localStorage.getItem('Email');
const passUser = localStorage.getItem('Password');
// filter
const filterSearch = document.getElementById("filter-search");
const filterOne = document.getElementById("filter-one");
const filterTwo = document.getElementById("filter-two");
const searchBtn = document.getElementById("searchBtnFilter");


if (!localStorage.getItem('Email') == false && !localStorage.getItem('Password') == false) {
   loginModal.style.display = "none";
   btnVisit.classList.remove("hide-btn");

   

   

   axios.get("http://localhost:3000/visit")
      .then(res => res)
      .then(com => {
         com.data.forEach(e => {
            if (e.authorVisit == emailUser) {
               if (e.doctor == "card") {
                  const doctorCard = "Кардиолог"
                  root.innerHTML += `
                  <button type="button" class="change-form btn btn-outline-success">Редактировать</button>
                  <button type="button" class=" del-cart btn btn-outline-secondary">X</button>
                  <div class="border-cart border-cart-card">
                   <p> <b>Врач:</b>${doctorCard} </p>
                     <p> <b>Цель визита:</b> ${e.targetVisit}</p>
                     <p> <b>Краткое описание визита:</b> ${e.description}</p>
                     <p> <b>Срочность:</b> ${e.urgency}</p>
                     <p> <b>Имя: </b>${e.name}</p>
                     <p> <b>Фамилия:</b> ${e.lastname}</p>
                     <p> <b>Отчество:</b> ${e.middlename}</p>
                     <p> <b>Обычное давление:</b> ${e.pressure}</p>
                     <p> <b>Индекс массы тела: </b>${e.indexMass}</p>
                     <p> <b>Перенесенные заболевания сердечно-сосудистой системы:</b> ${e.cardiovascularDiseases}</p>
                     <p> <b>Возраст:</b>  ${e.age}</p>
                  </div>
                 
                  <hr>
               `
               };
              
               if (e.doctor == "dent") {
                  const doctorDent = "Стоматолог";
                  root.innerHTML += `
                  <button type="button" class="change-form btn btn-outline-success">Редактировать</button>
                  <button type="button" class=" del-cart btn btn-outline-secondary">X</button>
                  <div class="border-cart border-cart-dent">
                     <p><b>Врач:</b> ${doctorDent}</p>
                     <p><b>Цель визита:</b> ${e.targetVisit}</p>
                     <p><b>Краткое описание визита: </b>${e.description}</p>
                     <p><b>Срочность:</b> ${e.urgency}</p>
                     <p><b>Имя: </b>${e.name}</p>
                     <p><b>Фамилия:</b> ${e.lastname}</p>
                     <p><b>Отчество:</b> ${e.middlename}</p>
                     <p><b>Дата последнего посещения:</b> ${e.dateOfLastVisit}</p>
                  </div>
                  <hr>
               `
               }
               if (e.doctor == "therap") {
                  const doctorTherap = "Терапевт";
                  root.innerHTML += `
                  <button type="button" class="change-form btn btn-outline-success">Редактировать</button>
                  <button type="button" class=" del-cart btn btn-outline-secondary">X</button>
                  <div class=" border-cart border-cart-therap">
                     <p><b>Врач:</b> ${doctorTherap}</p>
                     <p><b>Цель визита:</b> ${e.targetVisit}</p>
                     <p><b>Краткое описание визита:</b> ${e.description}</p>
                     <p><b>Срочность:</b> ${e.urgency}</p>
                     <p><b>Имя:</b> ${e.name}</p>
                     <p><b>Фамилия:</b> ${e.lastname}</p>
                     <p><b>Отчество:</b> ${e.middlename}</p>
                     <p><b>Возраст:</b> ${e.age}</p>
                  </div>
                  <hr>
               `
               }

               // searchBtn.addEventListener("click", () => {
               //    // console.log("Seacrh " + filterSearch.value + " " + "One-filter: " + filterOne.options[filterOne.selectedIndex].text + " " + "Two-filter: " + filterTwo.options[filterTwo.selectedIndex].text);
               //    // console.log(filterOne);
               //    if (filterSearch.value == e.targetVisit || 
               //        filterSearch.value == e.description) {
               //          filterSearch.search(filterSearch.value);

               //          console.log(filterSearch.value == e.targetVisit);
               //          console.log(filterSearch.value == e.description);
                     
               //          console.log("It`s Work!");
               //    } else {

               //       console.log("No work!");
               //    };
               // })
            }
         });
      })




   visitModal.addEventListener("click", () => {
      root.append(modal.render(visit.form))
      const visitTemplate = document.getElementById("visit-template");
      const addVisitForm = visitTemplate.content.children["visit-form"].cloneNode(true);
      const btnCreateVisit = document.getElementById("create-visit");
      // visit-form-id
      const doctor = document.getElementById("doctor");
      const targetVisit = document.getElementById("visit-target");
      const desc = document.getElementById("description");
      const urgency = document.getElementById("urgency");
      const firstName = document.getElementById("name");
      const lastName = document.getElementById("last-name");
      const middleName = document.getElementById("middle-name");
      const press = document.getElementById("pressure");
      const indexMass = document.getElementById("index-mass");
      const cardio = document.getElementById("cardiovascular-diseases");
      const age = document.getElementById("age");
      const dateLastVisit = document.getElementById("start");


      btnCreateVisit.addEventListener("click", async() => {
         const res = await axios.post('http://localhost:3000/visit', {
            "doctor": doctor.value,
            "targetVisit": targetVisit.value,
            "description": desc.value,
            "urgency": urgency.value,
            "name": firstName.value,
            "lastname": lastName.value,
            "middlename": middleName.value,
            "pressure": press.value,
            "indexMass": indexMass.value,
            "cardiovascularDiseases": cardio.value,
            "age": age.value,
            "dateOfLastVisit": dateLastVisit.value,
            "authorVisit": emailUser,
         });
         location.reload()
      })

      // --------------
      const select = document.getElementById('doctor');
      const content = {};

      [...select.querySelectorAll('option')]
      .forEach(opt => content[opt.value] = document.getElementById(opt.value));

      const onChange = value => {
         Object.keys(content).forEach(id => {
            content[id].style.display = value === id ? 'block' : 'none';
         });
      }

      select.addEventListener('change', e => onChange(e.target.value));
      onChange('card');

      modal.show();
   })
   // Filter


} else {
   root.innerHTML = "<center>No items have been added</center>"
   loginModal.addEventListener("click", () => {
      root.append(modal.render(login.form));
      const emailLog = document.getElementById("email-login");
      const passwordLog = document.getElementById("userPassword");
      const btnLogin = document.getElementById("btn-login-submit");
      const formTemplateLogin = document.getElementById("form-template");
      const addLoginForm = formTemplateLogin.content.children["login-form"].cloneNode(true);
      const ModalClose = document.getElementById("modal-close");
      const alertError = document.createElement("div");


      btnLogin.addEventListener("click", () => {
         const emailLogValue = emailLog.value;
         const passwordLogValue = passwordLog.value;

         Array.from(addLoginForm).filter((el) => {
            axios.get("http://localhost:3000/users")
               .then(res => res)
               .then(com => {
                  com.data.forEach(e => {
                     if (emailLogValue == e.email && passwordLogValue == e.password) {
                        localStorage.setItem('Email', emailLogValue);
                        localStorage.setItem('Password', passwordLogValue);
                        loginModal.style.display = "none";
                        btnVisit.classList.remove("hide-btn");
                        ModalClose.click();
                        location.reload()
                     } else {
                        alertError.innerText = "No correct Email or Password!";
                        alertError.setAttribute("class", "alert alert-danger alert-error-size");
                        alertError.setAttribute("role", "alert");
                        root.append(modal.render(alertError));
                     };
                  });
               })
            return el.type === "submit";
         })[0];
      })

      modal.show();
   });

}