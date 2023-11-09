const contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);
const form = document.querySelector(".modal");
const modalVisible = false;

let submit = document.querySelectorAll(" form .contact_button");
submit[0].addEventListener("click", (e) => {
  e.preventDefault();
  Soumission();
});

function contactMessage() {
  const h2 = document.querySelector(".modal h2");
  const name = document.querySelector(".photographer-profile h2").innerText;
  h2.innerHTML = `Contactez-moi ${name} `;
}
function clearBackground(){
  const clearBackground = document.querySelector(".contact_background")
  if(clearBackground !=undefined){
    clearBackground.remove()
  }
}

function displayModal() {
  
  clearBackground()

  const main = document.getElementById("main");
  main.setAttribute("aria-disabled", "true");
  const modal = document.getElementById("contact_modal");
  modal.showModal();
  contactMessage();
  const close = document.querySelector(".modal img");
  close.setAttribute("tabindex","0")  
  close.addEventListener("keydown", e=>{
    console.log(e);
    if(e.keyCode===13){
      modal.close()
      closeModal()
    }
  })
  const body = document.querySelector("body");
  body.style.overflow = "hidden";

  // contactFocus();

  const modalContent = document.getElementById("contact_modal");
  const divBackground = document.createElement("div");
  divBackground.classList.add("contact_background");
  modalContent.appendChild(divBackground);

  form.setAttribute("aria-hidden", "true");
  form.setAttribute("role", "form");
  // document.addEventListener("keydown", keyPress);
  
}

function keyPress(e) {
  if (e.keyCode === 27) {
    console.log("Appuie sur echap");
    closeModal();
  } else if (e.keyCode === 13) {
    console.log("Appuie sur entrée");
    Soumission();
  }
}

function contactFocus() {
  
  main.setAttribute("tabindex", "-1");

  const firstName = document.querySelector("#Prénom");
  firstName.focus();
  const lastName = document.querySelector("#LastName");
  const email = document.querySelector("#Email");
  const message = document.querySelector("#YourMessage");
  console.log(firstName);

  firstName.setAttribute("tabindex", "0");
  lastName.setAttribute("tabindex", "0");
  email.setAttribute("tabindex", "0");
  message.setAttribute("tabindex", "0");
  console.log("Terminé");
}


function closeModal() {
  console.log("Ouvert");
  const modalBackground = document.querySelector(".contact_background")
  modalBackground.remove()

  const modal = document.getElementById("contact_modal");
  modal.close();
  document.removeEventListener("keydown", keyPress);
  form.setAttribute("aria-hidden", "false"); 
}

function Soumission() {
  closeModal();
  const firstName = document.querySelector("#Prénom");
  const lastName = document.querySelector("#LastName");
  const email = document.querySelector("#Email");
  const message = document.querySelector("#YourMessage");
  console.log("l'utilisateur est : ", firstName.value + " " + lastName.value);
  console.log("Son adresse Mail est : " + email.value);
  console.log("Son message est: " + message.value);
  // Form();
}

function Form() {
  const firstName = document.querySelector("#Prénom");
  const lastName = document.querySelector("#LastName");
  const email = document.querySelector("#Email");
  const message = document.querySelector("#YourMessage");

  let nameRegExp = new RegExp("^[a-zA-Z]+");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let error = 0;
  FirstName();
  LastName();
  function FirstName() {
    if (nameRegExp.test(firstName.value) && firstName.textLength >= 2) {
      firstName.setAttribute("aria-invalid", "false");
      const closestChamp = document.querySelector(".firstName");
      DeleteError(closestChamp);
      console.log("Correct");
    } else {
      firstName.setAttribute("aria-invalid", "true");
      const closestChamp = document.querySelector(".firstName");
      CreateError(closestChamp);
      error++;
    }
  }
  function LastName() {
    if (nameRegExp.test(lastName.value) && lastName.textLength >= 2) {
      lastName.setAttribute("aria-invalid", "false");
      const closestChamp = document.querySelector(".lastName");
      console.log(closestChamp);
      DeleteError(closestChamp);
    } else {
      lastName.setAttribute("aria-invalid", "true");
      const closestChamp = document.querySelector(".lastName");
      CreateError(closestChamp);
      error++;
    }
  }
}
function CreateError(closestChamp) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("errorMessage");
  errorMessage.innerHTML = "Champs incorrect";
  closestChamp.appendChild(errorMessage);
}
function DeleteError() {
  const errorMessage = document.querySelector(".errorMessage");
  errorMessage.remove();
}

// displayModal();
