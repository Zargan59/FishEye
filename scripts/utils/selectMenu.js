function SelectMenu(triContent, media) {
  const tri = document.createElement("p");
  tri.innerHTML = "Trier par";
  triContent.appendChild(tri);

  const date = "Date";
  const pop = "Popularité";
  const titre = "Titre";
  
  const div = document.createElement("div");
  div.classList.add("buttonSection");
  const trueButton = document.createElement("div");
  trueButton.classList.add("vraiButton");
  trueButton.setAttribute("tabindex", "0");
  div.setAttribute("tabindex", "-1");

  const option1 = document.createElement("button");
  option1.classList.add("firstOption");
  option1.setAttribute("tabindex", "-1");
  option1.setAttribute("aria-hidden", "true")
  option1.innerHTML = pop;
  createChevron();

  const option2 = document.createElement("button");
  option2.innerHTML = date;
  option2.setAttribute("tabindex", "-1");
  trueButton.setAttribute("aria-label" , option1.textContent)

  const option3 = document.createElement("button");
  option3.innerHTML = titre;
  option3.setAttribute("tabindex", "-1");

  const hr1 = document.createElement("hr");
  const hr2 = document.createElement("hr");


  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      OpenMenu();
    } else if (e.key === "Escape") {
      CloseMenu();
    }
  });

  div.addEventListener("click", (e) => {
    const firstChoice = document.querySelector(".vraiButton");
    e.preventDefault();
    if (e.target !== firstChoice) {

      let prevChoice = option1.textContent;
      let choice = e.target.textContent;
      e.target.innerHTML = prevChoice;
      option1.innerHTML = choice;
      trueButton.setAttribute("aria-label" , choice )

      createChevron();
      CloseMenu();
      triData(media);
    }
  });
  let menuOpen = false;

  triContent.appendChild(div);
  div.appendChild(trueButton);
  div.appendChild(option1);
  div.appendChild(hr1);
  div.appendChild(option2);
  div.appendChild(hr2);
  div.appendChild(option3);

  function OpenMenu() {
    const chevronIcon = document.querySelector(".firstOption img");
    div.style.height = "fit-content";
    chevronIcon.classList.add("open");
    chevronIcon.classList.remove("close");
    menuOpen = true;
    option2.setAttribute("tabindex", "0");
    option2.setAttribute("aria-label", option2.textContent)

    option3.setAttribute("aria-label", option3.textContent)
    option3.setAttribute("tabindex", "0");

  }

  function CloseMenu() {
    const chevronIcon = document.querySelector(".firstOption img");
    chevronIcon.classList.add("close");
    chevronIcon.classList.remove("open");
    div.style.height = "50px";
    menuOpen = false;
    option2.setAttribute("tabindex", "-1");
    option3.setAttribute("tabindex", "-1");
  }

  trueButton.addEventListener("click", () => {
    Menu();
  });
  function createChevron() {
    const tee = document.createElement("img");
    tee.setAttribute("src", "assets/images/Chevron.svg");
    tee.setAttribute("alt", "close");
    tee.setAttribute("class", "close");
    option1.appendChild(tee);
  }

  function Menu() {
    if (menuOpen == false) {
      OpenMenu();
    } else {
      CloseMenu();
    }
  }

}
