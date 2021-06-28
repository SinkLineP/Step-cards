import constants from "./constants.js";
const { BASE_URL } = constants;


export default class LogIn {
   constructor() {
      this.form = this._createAddPostForm()
   }

   request(reqType, body) { }
   _createAddPostForm() {
      const formTemplate = document.getElementById("form-template");
      const addPostForm = formTemplate.content.children["login-form"].cloneNode(true);
      console.log(addPostForm);
      const submit = Array.from(addPostForm).filter((el) => {
         axios.get("http://localhost:3000/users")
         .then(res => res)
         .then(com => { com
            com.data.forEach(e => {
               
            });
         })
         return el.type === "submit";
      })[0];
      addPostForm.classList.add("col-12", "mx-auto", "my-5");
      addPostForm.addEventListener("submit", () => { 
         // const btnEnter = document.getElementById("ModalLogin")
         // btnEnter.classList.add("hide-btn")
         // alert("hello")
      });
      const container = document.createElement("div");
      container.classList.add("container");
      const row = document.createElement("div");
      row.classList.add("row");
      row.append(addPostForm);
      container.append(row);
      return container;
   }

   _createControlBtn(operationType, content) {
      return "button";
   }
}

