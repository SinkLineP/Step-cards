import constants from "./constants.js";

const { BASE_URL } = constants;

export default class Post {
   constructor() {
      this.form = this._createAddPostForm();
   }
   createPost() {}
   validateForm() {
      const values = new Map([]);
      Array.from(this.form).forEach((el) => {
         if (el.type !== "submit") {
            if (el.value.trim()) {
               values.set(el.id, el.value);
            }
         }
      });
      if (values.length === 5) {
         const postBody = Object.fromEntries(values);

         axios.post(BASE_URL + "/posts", postBody);
      }
   }
   request(reqType, body) {}
   _createAddPostForm() {
      const formTemplate = document.getElementById("form-template");
      const addPostForm =
         formTemplate.content.children["post-form"].cloneNode(true);
      console.log(addPostForm);

      const submit = Array.from(addPostForm).filter((el) => {
         return el.type === "submit";
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
   editPost() {}
   addComment() {}
   deletePost() {
      const btns = document.querySelectorAll("button");
      btns.forEach((btn) => {
         btn.parentNode.addEventListener("click", (evt) => {
            // const id = Number(btn.parentNode.getAttribute("data-id"));
            const id = 1;
            if (evt.target.tagName === "BUTTON") {
               //    btn.parentNode.remove();
               axios.delete(BASE_URL + "/posts" + `/${id}`).then(({ data }) => {
                  console.log(data);
               });
            }
         });
      });
   }
}
