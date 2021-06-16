
export default class LogIn {
   constructor() {
      this.form = this._createAddPostForm();
   }

   createUser() {
      
   }

   request(reqType, body) {}
   _createAddPostForm() {
      const formTemplate = document.getElementById("form-template");
      const addPostForm = formTemplate.content.children["login-form"].cloneNode(true);

      const submit = Array.from(addPostForm).filter((el) => {
         console.log(el.type === "submit");
         // return el.type === "submit";
      })[0];

      addPostForm.classList.add("col-12", "mx-auto", "my-5");

      addPostForm.addEventListener("submit", () => {});

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
