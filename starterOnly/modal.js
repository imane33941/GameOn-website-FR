const modalBground = document.querySelector(".bground");
const modalButtons = document.querySelectorAll(".modal-btn");
const formInputs = document.querySelectorAll(".formData");
const closeModalButton = document.querySelector(".close");

modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalButton.addEventListener("click", closeModal);

function launchModal() {
  modalBground.classList.add("active");
}

function closeModal() {
  modalBground.classList.remove("active");
}

function editNav() {
  const topNavbar = document.getElementById("myTopnav");
  topNavbar.classList.toggle("responsive");
}
