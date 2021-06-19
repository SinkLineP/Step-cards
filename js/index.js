import Visit from "./modules/Visit.js"
import LogIn from "./LogIn.js";
import Modal from "./Modal.js";

const visit = new Visit();
const login = new LogIn();
const modal = new Modal();

const root = document.getElementById("root");
const loginModal = document.getElementById("ModalLogin");
const visitModal = document.getElementById("ModalVisit");
const btnVisit = document.getElementById("btn-visit");


loginModal.addEventListener("click", () => {
   root.append(modal.render(login.form));
   const emailLog = document.getElementById("email-login");
   const passwordLog = document.getElementById("userPassword");
   const btnLogin = document.getElementById("btn-login-submit");
   const formTemplateLogin = document.getElementById("form-template");
   const addLoginForm = formTemplateLogin.content.children["login-form"].cloneNode(true);
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
                     console.log("Done")
                     loginModal.style.display = "none";
                     btnVisit.classList.remove("hide-btn")
                     ModalClose.click();
                  } else {
                     alert("No correct email or password!!")
                  };  
               });
            })
         return el.type === "submit";
      })[0];
      console.log("helo");
   })

   modal.show();
});



visitModal.addEventListener("click", () => {
  
   root.append(modal.render(visit.form))
   modal.show();

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



})
