export default class Visit {
    constructor() {
       this.form = this._createAddVisitForm();
    }
 
    createUser() {
       
    }
 
    request(reqType, body) {}
    _createAddVisitForm() {
       const formTemplates = document.getElementById("visit-template");
       const addVisitForm =
          formTemplates.content.children["visit-form"].cloneNode(true);
       console.log(addVisitForm);
 
       const submit = Array.from(addVisitForm).filter((el) => {
          return el.type === "submit";
       })[0];
       addVisitForm.classList.add("col-12", "mx-auto", "my-5");
 
       addVisitForm.addEventListener("submit", () => {});
 
       const container = document.createElement("div");
       container.classList.add("container");
 
       const row = document.createElement("div");
       row.classList.add("row");
 
       row.append(addVisitForm);
       container.append(row);
 
       return container;
    }
    _createControlBtn(operationType, content) {
       return "button";
    }
 }
 