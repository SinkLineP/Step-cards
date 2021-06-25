
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
let doctorVisit, dataVisit, visitCard;

if (!localStorage.getItem('Email') == false && !localStorage.getItem('Password') == false) {
   loginModal.style.display = "none";
   btnVisit.classList.remove("hide-btn");
   const cardVisit = localStorage.getItem('visit-card');
   const parseCardVisit = JSON.parse(cardVisit)
   dataVisit = parseCardVisit.data;
   

   if (dataVisit.doctor == "card") {
      doctorVisit = "Кардиолог";
   }
   if (dataVisit.doctor == "dent") {
      doctorVisit = "Стоматолог";
   }
   if (dataVisit.doctor == "therap") {
      doctorVisit = "Терапевт";
   }

   visitCard = {
      cardiolog: `
      <div>
          <p>Врач: ${doctorVisit}</p>
          <p>Цель визита: ${dataVisit.targetVisit}</p>
          <p>Краткое описание визита: ${dataVisit.description}</p>
          <p>Срочность: ${dataVisit.urgency}</p>
          <p>Имя: ${dataVisit.name}</p>
          <p>Фамилия: ${dataVisit.lastname}</p>
          <p>Отчество: ${dataVisit.middlename}</p>
          <p>Обычное давление: ${dataVisit.pressure}</p>
          <p>Индекс массы тела: ${dataVisit.indexMass}</p>
          <p>Перенесенные заболевания сердечно-сосудистой системы: ${dataVisit.cardiovascularDiseases}</p>
          <p>Возраст: ${dataVisit.age}</p>
      </div>
   `,
      dentist: `
      <div>
          <p>Врач: ${doctorVisit}</p>
          <p>Цель визита: ${dataVisit.targetVisit}</p>
          <p>Краткое описание визита: ${dataVisit.description}</p>
          <p>Срочность: ${dataVisit.urgency}</p>
          <p>Имя: ${dataVisit.name}</p>
          <p>Фамилия: ${dataVisit.lastname}</p>
          <p>Отчество: ${dataVisit.middlename}</p>
          <p>Дата последнего посещения: ${dataVisit.dateOfLastVisit}</p>
      </div>
   `,
      terapevt: `
      <div>
          <p>Врач: ${doctorVisit}</p>
          <p>Цель визита: ${dataVisit.targetVisit}</p>
          <p>Краткое описание визита: ${dataVisit.description}</p>
          <p>Срочность: ${dataVisit.urgency}</p>
          <p>Имя: ${dataVisit.name}</p>
          <p>Фамилия: ${dataVisit.lastname}</p>
          <p>Отчество: ${dataVisit.middlename}</p>
          <p>Возраст: ${dataVisit.age}</p>
      </div>
   `}

   if (parseCardVisit.data.doctor == "card") {
      root.innerHTML = visitCard.cardiolog;
   }
   if (parseCardVisit.data.doctor == "dent") {
      root.innerHTML = visitCard.dentist;
   }
   if (parseCardVisit.data.doctor == "therap") {
      root.innerHTML = visitCard.terapevt;
   }

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
            "dateOfLastVisit": dateLastVisit.value
         });

         
         // console.log(res.data.id.value);

         localStorage.setItem("visit-card", JSON.stringify(res));
         res.data.headers['Content-Type'];
      })

      const select = document.querySelector('select');
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

} else {
   localStorage.setItem('visit-card', '{"data":{"doctor":"","targetVisit":"","description":"","urgency":"","name":"","lastname":"","middlename":"","pressure":"","indexMass":"","cardiovascularDiseases":"","age":"","dateOfLastVisit":"","id":1}}')
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




