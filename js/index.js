import Post from "./Post.js";
import Modal from "./Modal.js";

const post = new Post();
const modal = new Modal();

const root = document.getElementById("root");
const addPost = document.getElementById("ModalLogin");

addPost.addEventListener("click", () => {
   root.append(modal.render(post.form));
   modal.show();
});
