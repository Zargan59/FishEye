init();
let photographFirstName

let mediaTab = []
//Je récupère les infos du photographes en passant par l'id présent dans l'URL
const URL_ID = location.search;
const urlSearchParams = new URLSearchParams(URL_ID);
const ID = urlSearchParams.get("id");

//Je récupère l'utilisateur dans la base de donnés grace à son url
const MAIN = document.getElementById("main");

async function getInfos() {
  const dataRequest = await fetch("../../data/photographers.json");
  const data = await dataRequest.json();
  const photographerTab = data.photographers;
 

  return {
    photographer: photographerTab,
    media: data.media,
  };
}

getInfos()

async function init() {
  const { photographer, media } = await getInfos();
  PhotoContent(media, photographer) 
  let photographerInfo = photographer.find((element) => element.id == ID);
  getPhotographMedia(media)
  PhotographName(photographerInfo)
  displayData(photographer)
  // displayMedia(media,photographer)
  triData(photographer)
  Price(photographerInfo)
}

async function displayData(photographer) {
  const photographInfo = document.querySelector(".photograph-header");
  photographer.forEach(photograph => {
    if (photograph.id == ID) {
    const presentationModel = photographHeader(photograph)
    presentationModel.getUserCardDOM()
    }
  });
  
}
async function getPhotographMedia(media){
  media.forEach(element => {
    if (element.photographerId == ID) {
      mediaTab.push(element)
    }
  });
}

async function displayMedia(){
const mediaSection = document.querySelector(".photoContent");
mediaTab.forEach(element => {
  if (element.photographerId == ID) {
    const mediaModel = mediaFactory(element)
    const mediaCardDOM = mediaModel.constructMedia()
    mediaSection.appendChild(mediaCardDOM)

  }
});
}



async function PhotographName(photographerInfo){
  

  const photographName = photographerInfo.name;
  photographFirstName = photographName.split(" ")[0];
  photographFirstName = photographFirstName.replace("-", " ");
}

// async function PresentationTemplate(photographer) {
//   const { name, portrait, city, country, tagline } = photographer;

//   const infoContent = document.querySelector(".photograph-header");

//   const photographProfile = document.createElement("div");
//   photographProfile.classList.add("photographer-profile");

//   const NAME = document.createElement("h2");
//   NAME.innerHTML = name;

//   const CITY = document.createElement("p");
//   CITY.classList.add("location");
//   CITY.innerHTML = `${city}, ${country}`;

//   const TAGLINE = document.createElement("p");
//   TAGLINE.innerHTML = tagline;
//   TAGLINE.classList.add("quote");

//   photographProfile.appendChild(NAME);
//   photographProfile.appendChild(CITY);
//   photographProfile.appendChild(TAGLINE);

//   const IMG = document.createElement("img");
//   IMG.setAttribute("alt", name);
//   const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
//   IMG.setAttribute("src", picture);

//   infoContent.appendChild(photographProfile);
//   infoContent.appendChild(IMG);
// }

async function Price(photographer) {
  const { price } = photographer;

  const nmbersContent = document.createElement("div");
  nmbersContent.classList.add("price_content");
  
  const Price = document.createElement("p");
  Price.innerHTML = `${price}€/jour `;
  Price.classList.add("price");
  nmbersContent.appendChild(Price);
  
  MAIN.appendChild(nmbersContent);
  allLikes()
}
async function allLikes(){
  const nmbersContent = document.querySelector(".price_content");

  const likeContent = document.createElement("div");
  likeContent.classList.add("likeContent");
  const Like = document.createElement("p");
  Like.classList.add("price");
  const coeur = document.createElement("img");
  coeur.setAttribute("src", "../../assets/icons/coeur.svg");
  coeur.setAttribute("alt", "likes");

  likeContent.appendChild(Like);
  likeContent.appendChild(coeur);
  nmbersContent.appendChild(likeContent);
  calculateLike(Like);


}

async function PhotoContent(media, photographer) {
  const Content = document.createElement("div");
  Content.classList.add("Content");

  const photoContent = document.createElement("div");
  photoContent.classList.add("photoContent");

  const triContent = document.createElement("div");
  triContent.classList.add("triContent");
  SelectMenu(triContent, media, photographer);
  MAIN.appendChild(Content);
  Content.appendChild(triContent);
  Content.appendChild(photoContent);
}
async function calculateLike(Like) {
    const allLikes = document.querySelectorAll(".nombreLike");
    let totalLike = 0;
    allLikes.forEach((element) => {
      totalLike = Number(element.textContent) + totalLike;
    });
    Like.innerHTML = totalLike;
  }



function createLabel() {
  const div = document.createElement("div");
  const form = document.querySelector(".modal form");

  let FormChamps = ["Nom", "Email", "Votre message"];

  //Il me faut un nom de label
  //Pour chaque champs demandé, je créé un label et un input
  FormChamps.forEach((element) => {
    const label = document.createElement("label");
    label.innerHTML = element;
    const input = document.createElement("input");
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
  });
}



async function triData(photographer){
  clearMedia()
  const option1 = document.querySelector(".firstOption").textContent
  if(option1 == "Popularité"){
    mediaTab.sort((a,b)=>b.likes - a.likes)
  }
  else if(option1 == "Date"){
    mediaTab.sort((a,b)=> new Date(a.date).valueOf() - new Date(b.date).valueOf())

  }
  else if(option1 == "Titre"){
    mediaTab.sort((a,b)=>{
      if(a.title < b.title){
        return -1
      }
      else{
        return 1
      }
    })

  }
  else{
    console.log('Aucun des choix');
  }
  displayMedia(photographer)
}

async function clearMedia(){
  const mediaSection = document.querySelector(".photoContent");
  mediaSection.innerHTML = ``
  //Permet de clear le tableau mediaInfo pour la gestion de la lightbox
  info.length= 0 
}

async  function AddLike(like, coeur) {
   if (coeur.className == "liked") {
     coeur.classList.remove("liked");
     like.innerHTML = Number(like.textContent) - 1;
   } else {
     coeur.classList.add("liked");
     like.innerHTML = Number(like.textContent) + 1;
   }
   const Like = document.querySelector(".likeContent .price");
   calculateLike(Like);
 }