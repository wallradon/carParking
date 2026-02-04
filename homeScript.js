
const modal = document.querySelector("#myModal");
const closeModal = document.querySelector("#closeModal");
modal.showModal();

closeModal.addEventListener("click", function (event) {

  event.preventDefault();

  modal.close();
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.close();
  }
});