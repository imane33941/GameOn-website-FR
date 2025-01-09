const [
  modalBground,
  closeModalButton,
  conditionsAccepted,
  submitFormInput,
  firstNameInput,
  lastNameInput,
  emailInput,
  birthdateInput,
  quantityInput,
  form,
  locationRadio,
  validation,
] = getElementFromPage(
  ".bground",
  ".close",
  "#checkbox1",
  ".btn-submit",
  "#first",
  "#last",
  "#email",
  "#birthdate",
  "#quantity",
  "#form",
  ".checkbox-input",
  ".bground2"
);

const modalButtons = document.querySelectorAll(".modal-btn");
const formInputs = document.querySelectorAll(".formData");
const newsletters = document.getElementById("checkbox2");
const closeConfirmation = document.getElementById("close-btn-confirmation");
const spanConfirmation = document.getElementsByClassName("close-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let count = 0;

  const objectForm = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    quantity: quantityInput.value,
    // si aucune location sélectionnée alors set à null, sinon prendre la valeur
    location:
      document.querySelector('input[name="location"]:checked') == null
        ? null
        : document.querySelector('input[name="location"]:checked').value,
    isAcceptConditions: document.querySelector("#checkbox1").checked,
    isAcceptNotifications: document.querySelector("#checkbox2").checked,
  };

  //   // Enregistrer dans le localstorage
  localStorage.setItem("firstName", objectForm.firstName);
  localStorage.setItem("lastName", objectForm.lastName);
  localStorage.setItem("email", objectForm.email);
  localStorage.setItem("birthdate", objectForm.birthdate);
  localStorage.setItem("quantity", objectForm.quantity);
  localStorage.setItem("location", objectForm.location);
  localStorage.setItem("isAcceptConditions", objectForm.isAcceptConditions);
  localStorage.setItem(
    "isAcceptNotifications",
    objectForm.isAcceptNotifications
  );

  //   // verify prenom:
  if (objectForm.firstName == "") {
    let message = "le champ prénom ne peut être vide";
    setError(firstNameInput, message);
  } else if (!objectForm.firstName.match(/^[a-zA-Z]/)) {
    let message = "le prénom doit commencer par une lettre";
    setError(firstNameInput, message);
  } else {
    let letterNumber = objectForm.firstName.length;
    if (letterNumber < 2) {
      let message = "le prénom doit avoir au moins 2 caractères";
      setError(firstNameInput, message);
    } else {
      setSuccess(firstNameInput);

      count++;
    }
  }
  // verify nom:
  if (objectForm.lastName == "") {
    let message = "le champ nom ne peut être vide";
    setError(lastNameInput, message);
  } else if (!objectForm.lastName.match(/^[a-zA-Z]/)) {
    let message = "le nom doit commencer par une lettre";
    setError(lastNameInput, message);
  } else {
    let letterNumber = objectForm.lastName.length;
    if (letterNumber < 2) {
      let message = "le nom doit avoir au moins 2 caractères";
      setError(lastNameInput, message);
    } else {
      setSuccess(lastNameInput);
      count++;
    }
  }
  // verify email:

  if (objectForm.email == "") {
    let message = "Veuillez renseigner votre email.";
    setError(emailInput, message);
  } else if (!email_verify(objectForm.email)) {
    let message = "Email non valide";
    setError(emailInput, message);
  } else {
    setSuccess(emailInput);
    count++;
  }
  // verify birthdate:
  if (objectForm.birthdate.length < 1) {
    let message = "Veuillez renseigner votre date de naissance.";
    setError(birthdate, message);
  } else {
    setSuccess(birthdate);
    count++;
  }
  // verify quantity:
  if (objectForm.quantity.length < 1 || objectForm.quantity < 0) {
    let message = "Veuillez renseigner le champs quantité de tournois.";
    setError(quantity, message);
  } else {
    setSuccess(quantity);
    count++;
  }
  // verify city:
  if (objectForm.location === null) {
    let message = "Vous devez choisir une option.";
    setError(locationRadio, message);
  } else {
    setSuccess(locationRadio);
    count++;
  }
  // verify conditions:
  if (objectForm.isAcceptConditions === false) {
    let message = "Veuillez acceptez les termes et conditions.";
    setError(conditionsAccepted, message);
  } else {
    setSuccess(conditionsAccepted);
    count++;
  }

  if (count == 7) {
    validation.style.display = "block";
    const fields = document.querySelectorAll(".text-control");
    for (let i = 0; i < fields.length; i++) {
      fields[i].value = "";
    }
  }
});

modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalButton.addEventListener("click", closeModal);
closeConfirmation.addEventListener("click", closeValidation);
spanConfirmation[0].addEventListener("click", closeValidation);

function setError(elem, message) {
  const formControl = elem.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "formData error";
  small.classList.add("active");
  small.classList.remove("hidden");
}

function setSuccess(elem) {
  const formControl = elem.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "formData success";
  small.classList.add("hidden");
  small.classList.remove("active");
}

function closeValidation(e) {
  modalBground.classList.remove("active");
  validation.style.display = "none";
}

function email_verify(emailInput) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(emailInput);
}

function launchModal() {
  modalBground.classList.add("active");
  validation.classList.remove("active");
}

function closeModal() {
  modalBground.classList.remove("active");
}

function editNav() {
  const topNavbar = document.getElementById("myTopnav");
  topNavbar.classList.toggle("responsive");
}
function getElementFromPage(...selectors) {
  return selectors.map((selectors) => document.querySelector(selectors));
}
