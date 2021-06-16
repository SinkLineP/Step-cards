import Visit from "./modules/Visit.js"
import LogIn from "./LogIn.js";
import Modal from "./Modal.js";

const visit = new Visit();
const login = new LogIn();
const modal = new Modal();

const root = document.getElementById("root");
const loginModal = document.getElementById("ModalLogin");
const visitModal = document.getElementById("ModalVisit")

loginModal.addEventListener("click", () => {
   root.append(modal.render(login.form));
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