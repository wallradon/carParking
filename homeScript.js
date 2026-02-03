const modal = document.querySelector("#myModal");
const closeModal = document.querySelector("#closeModal");

modal.showModal();

closeModal.addEventListener("click", function () { modal.close(); });