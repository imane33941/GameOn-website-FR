// La récupération des elements
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
const closeConfirmation = document.getElementById("close-btn-confirmation");
const spanConfirmation = document.getElementsByClassName("close-confirmation");

// const pour supprimer les valeurs renseignées au niveau de chaque champ rempli.
const resetForm = () => {
  document
    .querySelectorAll(".text-control")
    .forEach((input) => (input.value = ""));
  document
    .querySelectorAll(".checkbox-input")
    .forEach((input) => (input.checked = false));
  conditionsAccepted.checked = true;
  document
    .querySelectorAll("input[type=radio]")
    .forEach((input) => (input.checked = false));
  document.querySelectorAll("small").forEach((errorElt) => {
    errorElt.classList.add("hidden");
    errorElt.classList.remove("active");
  });
  formInputs.forEach((input) => {
    input.classList.remove("error");
    input.classList.remove("success");
  });
};

// Evenements
modalButtons.forEach((btn) => btn.addEventListener("click", launchModal));
closeModalButton.addEventListener("click", closeModal);
closeConfirmation.addEventListener("click", closeValidation);
spanConfirmation[0].addEventListener("click", closeValidation);

form.addEventListener("submit", (e) => {
  // Empêcher le comportement de la soumission du formulaire
  e.preventDefault();

  form_verify();
});

// Les fonctions:

// fonction qui récupère les données du form et demande la vérificaiton
function form_verify() {
  let numberOfValidInputs = 1;

  // Récupérer toutes les valeurs des inputs
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

  // verify prenom:
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

      numberOfValidInputs++;
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
      numberOfValidInputs++;
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
    numberOfValidInputs++;
  }
  // verify birthdate:
  if (objectForm.birthdate.length < 1) {
    let message = "Veuillez renseigner votre date de naissance.";
    setError(birthdate, message);
  } else {
    setSuccess(birthdate);
    numberOfValidInputs++;
  }
  // verify quantity:
  if (objectForm.quantity.length < 1 || objectForm.quantity > 99) {
    let message =
      "Veuillez renseigner le champs quantité de tournois entre 0 et 99.";
    setError(quantity, message);
  } else {
    setSuccess(quantity);
    numberOfValidInputs++;
  }
  // verify city:
  if (objectForm.location === null) {
    let message = "Vous devez choisir une option.";
    setError(locationRadio, message);
  } else {
    setSuccess(locationRadio);
    numberOfValidInputs++;
  }
  // verify conditions:
  if (objectForm.isAcceptConditions === false) {
    let message = "Veuillez acceptez les termes et conditions.";
    setError(conditionsAccepted, message);
  } else {
    setSuccess(conditionsAccepted);
    numberOfValidInputs++;
  }

  if (numberOfValidInputs === Object.keys(objectForm).length) {
    validation.style.display = "block";
    console.log("récupération de notre objet avec les valeurs", objectForm);

    // appeler la const pour reset les valeurs des inputs après soumission du formulaire
    resetForm();
  }
}

// fonction permettant l'affichage des erreurs
function setError(elem, message) {
  const formControl = elem.parentElement;
  const small = formControl.querySelector("small");

  // Ajout du message d'erreur
  small.innerText = message;

  // Ajout de la classe error
  formControl.classList.add("error");
  formControl.classList.remove("success");
  small.classList.remove("hidden");
}

// fonction permettant de remove les erreurs
function setSuccess(elem) {
  const formControl = elem.parentElement;
  const small = formControl.querySelector("small");
  formControl.classList.remove("error");
  formControl.classList.add("success");
  small.classList.add("hidden");
}

// Fonction qui ferme le message de validation
function closeValidation() {
  // cacher le formulaire
  modalBground.classList.remove("active");
  // fermer le message de validation
  validation.style.display = "none";
}

// fonction qui vérifie si email valide via les regex (expression régulière)
function email_verify(emailInput) {
  const regexEmail = /^[a-z0-9._-]+@[a-z0-9]{2,}\.[a-z]{2,4}$/;
  return regexEmail.test(emailInput);
}

// Ouvrir la modal du formulaire
function launchModal() {
  // afficher la modal avec formulaire
  modalBground.classList.add("active");
  // cacher le message de validation
  validation.classList.remove("active");
}

// Fermer la modal du formulaire
function closeModal() {
  resetForm();
  modalBground.classList.remove("active");
}

function editNav() {
  const topNavbar = document.getElementById("myTopnav");
  topNavbar.classList.toggle("responsive");
}
function getElementFromPage(...selectors) {
  return selectors.map((selectors) => document.querySelector(selectors));
}
