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
function clearBackground() {
  const clearBackground = document.querySelector(".contact_background");
  if (clearBackground != undefined) {
    clearBackground.remove();
  }
}

function displayModal() {
  clearBackground();
  const main = document.getElementById("main");
  main.setAttribute("aria-disabled", "true");
  const modal = document.getElementById("contact_modal");
  modal.showModal();
  contactMessage();
  const close = document.querySelector(".modal img");
  close.setAttribute("tabindex", "0");
  close.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      modal.close();
      closeModal();
    }
  });
  const body = document.querySelector("body");
  body.style.overflow = "hidden";

  const modalContent = document.getElementById("contact_modal");
  const divBackground = document.createElement("div");
  divBackground.classList.add("contact_background");
  modalContent.appendChild(divBackground);

  form.setAttribute("aria-hidden", "false");
  form.setAttribute("role", "form");
}

function keyPress(e) {
  if (e.keyCode === 27) {
    closeModal();
  } else if (e.keyCode === 13) {
    Soumission();
  }
}

function closeModal() {
  const modalBackground = document.querySelector(".contact_background");
  modalBackground.remove();
  
  const body = document.querySelector("body");
  body.style.overflow = "visible";

  const modal = document.getElementById("contact_modal");
  modal.close();
  document.removeEventListener("keydown", keyPress);
  form.setAttribute("aria-hidden", "true");
}

function Soumission() {
  closeModal();
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#LastName");
  const email = document.querySelector("#Email");
  const message = document.querySelector("#YourMessage");
  console.log("l'utilisateur est : ", firstName.value + " " + lastName.value);
  console.log("Son adresse Mail est : " + email.value);
  console.log("Son message est: " + message.value);
}


