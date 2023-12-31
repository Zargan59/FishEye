function lightBox(image, video) {

  document.addEventListener("keypress", keyPressLightBox)
  let media = image;
  if (image == undefined) {
    media = video;
  }
  /******************** Permet d'identifier sur quel media l'user à clicker ***********************/
  let i = 0;
  let mediaPosition = 0;
  info.forEach((element) => {
    if (element.path !== media) {
      i++;
    } else {
      mediaPosition = i;
    }
  });

  const mediaClicked = info[mediaPosition];

  /******************** Permet d'identifier sur quel media l'user à clicker ***********************/
  constructorLightBox(mediaClicked);
}

function keyPressLightBox(e) {
  console.log(e);
  if (e.key === "ArrowRight") {
    NextPicture();
  } else if (e.key === "ArrowLeft") {
    PreviousPicture();
  } else if (e.key === "Escape") {
    closeLightbox();
  }
}

function constructorLightBox(mediaClicked) {
  const main = document.querySelector("main");
  main.setAttribute("aria-hidden","true")
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
  // body.setAttribute('aria-hidden',"true")
  const lightBoxContent = document.createElement("div");
  lightBoxContent.classList.add("lightBoxContent");

  const navigationDiv = document.createElement("div");
  navigationDiv.classList.add("lightBoxNavigation");

  // rajouter une div contenant l'image
  const mediaDiv = document.createElement("div");
  mediaDiv.classList.add("pictureContent");
  mediaDiv.setAttribute("tabindex","0")

  const mediaContent = document.createElement("div");
  mediaContent.classList.add("image");
  document.addEventListener("keydown", keyPressLightBox);

  if (mediaClicked.type == "image") {
    const image = document.createElement("img");
    image.setAttribute("src", mediaClicked.source);
    image.setAttribute("alt", mediaClicked.alt);
    mediaContent.appendChild(image);
  } else {
    const video = document.createElement("video");
    video.setAttribute("src", mediaClicked.source);
    video.setAttribute("controls", " ");
    mediaContent.appendChild(video);
  }

  const titleContent = document.createElement("div");
  titleContent.classList.add("lightbox_title");
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerHTML = mediaClicked.title;
  titleContent.appendChild(title);

  main.appendChild(lightBoxContent);
  mediaDiv.appendChild(mediaContent);
  lightBoxContent.appendChild(navigationDiv);

  constructorClose(navigationDiv);
  constructorLeftArrow(navigationDiv);
  constructorRightArrow(navigationDiv);
  mediaDiv.appendChild(titleContent);
  navigationDiv.appendChild(mediaDiv);
  focusOutLightBox(lightBoxContent);
}

function constructorLeftArrow(navigationDiv) {
  const leftArrow = document.createElement("img");
  leftArrow.setAttribute("src", "assets/icons/Chevron.svg");
  leftArrow.setAttribute("alt", "Previous image");
  leftArrow.classList.add("leftArrow");
  leftArrow.classList.add("arrow");
  leftArrow.setAttribute("tabindex", "0");
  navigationDiv.appendChild(leftArrow);
  leftArrow.addEventListener("click", (e) => {
    e.preventDefault();
    PreviousPicture();
  });
}
function constructorRightArrow(navigationDiv) {
  const rightArrow = document.createElement("img");
  rightArrow.setAttribute("src", "assets/icons/Chevron.svg");
  rightArrow.setAttribute("alt", "Previous image");
  rightArrow.classList.add("rightArrow");
  rightArrow.classList.add("arrow");
  rightArrow.setAttribute("tabindex", "0");
  navigationDiv.appendChild(rightArrow);

  rightArrow.addEventListener("click", (e) => {
    e.preventDefault();
    NextPicture();
  });
}
function constructorClose(navigationDiv) {
  const croixLightBox = document.createElement("img");
  croixLightBox.classList.add("quitte");
  croixLightBox.setAttribute("src", "assets/icons/close.svg");
  croixLightBox.setAttribute("alt", "Close dialog");
  croixLightBox.setAttribute("tabindex", "0");
  croixLightBox.focus;

  navigationDiv.appendChild(croixLightBox);
  croixLightBox.addEventListener("click", closeLightbox);
}
function focusOutLightBox(lightBoxContent) {
  const focusOut = document.createElement("div");
  focusOut.classList.add("focusOut");
  lightBoxContent.appendChild(focusOut);
  focusOut.addEventListener("click", closeLightbox);
}

function NextPicture() {
  const mediaDiv = document.querySelector(".image");
  const media = mediaDiv.firstChild;
  // i correspond à l'emplacement de l'image clické
  //Je veux que i corresponde à l'image qui est affiché actuelemment
  let i = info.findIndex((element) => element.alt == media.alt);
  i++;

  if (i >= info.length) {
    i = 0;
  }
  loadImage(i);
}

function PreviousPicture() {
  const mediaDiv = document.querySelector(".image");
  const media = mediaDiv.firstChild;
  // i correspond à l'emplacement de l'image clické
  //Je veux que i corresponde à l'image qui est affiché actuelemment
  let i = info.findIndex((element) => element.alt == media.alt);
  i--;

  if (i < 0) {
    i = info.length - 1;
  }
  loadImage(i);
}

function closeLightbox() {
  const lightBoxContent = document.querySelector(".lightBoxContent");
  lightBoxContent.remove();
  const body = document.querySelector("body");
  body.style.overflow = "visible";
  const main = document.querySelector("main");
  main.setAttribute("aria-hidden","false")
}

function loadImage(i) {
  const mediaDiv = document.querySelector(".image");
  const media = mediaDiv.firstChild;
  if (info[i].type == "image") {
    if (media.localName == "video") {
      media.remove();
      const image = document.createElement("img");
      image.setAttribute("src", info[i].source);
      image.setAttribute("alt", info[i].alt);
      mediaDiv.appendChild(image);
    }
  } else {
    media.remove();
    const video = document.createElement("video");
    video.setAttribute("src", info[i].source);
    video.setAttribute("alt",info[i].title )
    video.setAttribute("controls", " ");

    mediaDiv.appendChild(video);
  }
  media.src = info[i].source;
  media.alt = info[i].title;
  const title = document.querySelector(".title");
  title.innerHTML = info[i].title;
}
