import Visit from "./modules/Visit.js";
import LogIn from "./LogIn.js";
import Modal from "./Modal.js";
import { filter, submit } from "./modules/Filter-Search.js"

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

   let form = document.querySelector('.search-form');
   form.addEventListener('keyup', filter);
   form.addEventListener('submit', submit);


   axios.get("http://localhost:3000/visit")
      .then(res => res)
      .then(com => {
         com.data.forEach(e => {
            if (e.authorVisit == emailUser) {
               if (e.doctor == "card") {
                  const doctorCard = "Кардиолог"
                  root.innerHTML += `
                  <div class="card show">
                  <div id="overlay"></div>
                  <div class="border-cart border-cart-card cardItem">
                  <button type="button" class="change-form btn btn-outline-success" id="form-change">Редактировать</button>
                  <button type="button" class="del-cart btn btn-outline-secondary" id="del-visit" data-del="delete">X</button>
                     <p><b>Врач:</b>${doctorCard}</p>
                     <p><b>Цель визита:</b> <span>${e.targetVisit}</span></p>
                     <p><b>Краткое описание визита:</b> <span>${e.description}</span></p>
                     <p><b>Срочность:</b> <span>${e.urgency}</span></p>
                     <p><b>Имя: </b>${e.name}</p>
                     <p><b>Фамилия:</b> ${e.lastname}</p>
                     <p><b>Отчество:</b> ${e.middlename}</p>
                     <p><b>Обычное давление:</b> ${e.pressure}</p>
                     <p><b>Индекс массы тела: </b>${e.indexMass}</p>
                     <p><b>Перенесенные заболевания сердечно-сосудистой системы:</b> ${e.cardiovascularDiseases}</p>
                     <p><b>Возраст:</b>  ${e.age}</p>
                  </div>
                  </div>
               `
               };

               if (e.doctor == "dent") {
                  const doctorDent = "Стоматолог";
                  root.innerHTML += `
                  <div class="card show">
                  <div id="overlay"></div>
                  <div class="border-cart border-cart-dent cardItem">
                  <button type="button" class="change-form btn btn-outline-success"  >Редактировать</button>
                  <button type="button" class="del-cart btn btn-outline-secondary" id="del-visit" data-del="delete">X</button>
                     <p><b>Врач:</b> ${doctorDent}</p>
                     <p><b>Цель визита:</b> <span>${e.targetVisit}</span></p>
                     <p><b>Краткое описание визита:</b> <span>${e.description}</span></p>
                     <p><b>Срочность:</b> <span>${e.urgency}</span></p>
                     <p><b>Имя: </b>${e.name}</p>
                     <p><b>Фамилия:</b> ${e.lastname}</p>
                     <p><b>Отчество:</b> ${e.middlename}</p>
                     <p><b>Дата последнего посещения:</b> ${e.dateOfLastVisit}</p>
                  </div>
                  </div>
               `
               }
               if (e.doctor == "therap") {
                  const doctorTherap = "Терапевт";
                  root.innerHTML += `
                  <div class="card show">
                  <div id="overlay"></div>
                  <div class=" border-cart border-cart-therap cardItem">
                  <button type="button" class="change-form btn btn-outline-success" >Редактировать</button>
                  <button type="button" class="del-cart btn btn-outline-secondary" id="del-visit" data-del="delete">X</button>
                     <p><b>Врач:</b> ${doctorTherap}</p>
                     <p><b>Цель визита:</b> <span>${e.targetVisit}</span></p>
                     <p><b>Краткое описание визита:</b> <span>${e.description}</span></p>
                     <p><b>Срочность:</b> <span>${e.urgency}</span></p>
                     <p><b>Имя:</b> ${e.name}</p>
                     <p><b>Фамилия:</b> ${e.lastname}</p>
                     <p><b>Отчество:</b> ${e.middlename}</p>
                     <p><b>Возраст:</b> ${e.age}</p>
                  </div>
                  </div>
               `}
  
               const changeForm = document.getElementById("form-change");
               console.log(changeForm)
                     changeForm.addEventListener("click", () => {
                        root.append(modal.render(visit.form))
                        const visitTemplate = document.getElementById("visit-template");
                        const addVisitForm = visitTemplate.content.children["visit-form"].cloneNode(true);
                        const btnCreateVisit = document.getElementById("create-visit");
                        const btnCloseVisit = document.getElementById("close-visit");
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
                        const ModalClose = document.getElementById("modal-close");
                  
                        btnCreateVisit.addEventListener("click", async () => {
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
                           location.reload();
                        })
                  
                        btnCloseVisit.addEventListener("click", () => {
                           ModalClose.click();
                           console.log("Modal-Close");
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
                     });
                  
               
             


               function removeElem(delElem, attribute, attributeName) {
                    if (!(delElem && attribute && attributeName)) return;
                    return function(e) {
                      let target = e.target;
                      if (!(target.hasAttribute(attribute) ?
                          (target.getAttribute(attribute) === attributeName ? true : false) : false)) return;
                      let elem = target;
                 
                      while (target != this) {
                        if (target.classList.contains(delElem)) {
                          target.remove();
                           
                          return;
                        }
                        target = target.parentNode;
                      }
                      return;
                    };
                  }
                  
                  
                  document.addEventListener("click", removeElem("card", "data-del", "delete"));
            }
         });
      })


   visitModal.addEventListener("click", () => {
      root.append(modal.render(visit.form))
      const visitTemplate = document.getElementById("visit-template");
      const addVisitForm = visitTemplate.content.children["visit-form"].cloneNode(true);
      const btnCreateVisit = document.getElementById("create-visit");
      const btnCloseVisit = document.getElementById("close-visit");
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
      const ModalClose = document.getElementById("modal-close");

      btnCreateVisit.addEventListener("click", async () => {
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
         location.reload();
      })

      btnCloseVisit.addEventListener("click", () => {
         ModalClose.click();
         console.log("Modal-Close");
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
      const alertError = document.createElement("div");
      const ModalClose = document.getElementById("modal-close");

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