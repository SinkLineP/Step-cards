export default class Modal {
   constructor() {
      this.modal = this.create();
      this.bModal = new bootstrap.Modal(this.modal);
   }

   create() {
      const modalWrapper = document.createElement("div");
      modalWrapper.classList.add("modal-wrapper");

      modalWrapper.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Authorization</h5>
                <button type="button" id="modal-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body"></div>
            </div>
          </div>
        </div>
        `;

      return modalWrapper.firstChild;
   }

   render(content) {
      const modalBody = this.modal.querySelector(".modal-body");
      modalBody.append(content);

      return this.modal;
   }

   show() {
      const _this = this;
      const removeModal = function () {
         setTimeout(() => {
            _this.modal.remove();
            _this.modal.removeEventListener("hidden.bs.modal", removeModal);
         }, 500);
      };
      this.modal.addEventListener("hidden.bs.modal", removeModal);
      this.bModal.toggle();
   }
}
