let info = [];

function photographHeader(photographer) {
  const { name, portrait, city, country, tagline, price, id } = photographer;
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
  function getUserCardDOM() {

    const infoContent = document.querySelector(".photograph-header");

    const photographProfile = document.createElement("div");
    photographProfile.classList.add("photographer-profile");

    const NAME = document.createElement("h2");
    NAME.innerHTML = name;

    const CITY = document.createElement("p");
    CITY.classList.add("location");
    CITY.innerHTML = `${city}, ${country}`;

    const TAGLINE = document.createElement("p");
    TAGLINE.innerHTML = tagline;
    TAGLINE.classList.add("quote");
    
    const contact = document.querySelector('.contact_button')

    photographProfile.appendChild(NAME);
    photographProfile.appendChild(CITY);
    photographProfile.appendChild(TAGLINE);

    const IMG = document.createElement("img");
    IMG.setAttribute("alt", name);
    IMG.setAttribute("src", picture);

    infoContent.appendChild(photographProfile);
    infoContent.appendChild(contact)
    infoContent.appendChild(IMG);
    return( infoContent)
  }
  return{getUserCardDOM}
}

function mediaFactory(data){
  const { title, image, video, likes, date } = data;
  const PhotoFolder = `assets/photographers/${photographFirstName}`;
  function constructMedia(){
    const imageContent = document.createElement("div");
    imageContent.classList.add("imageContent");
    imageContent.setAttribute("tabindex", "0")
    
    const titreContent = document.createElement("div");
    const titre = document.createElement("p");
    titre.innerHTML = title;
    titreContent.classList.add("titleContent");
    const likeContent = document.createElement("div");
    likeContent.classList.add("likeContent");
    
    let like = document.createElement("p");
    like.classList.add("nombreLike");
    like.innerHTML = `${likes}`;
    const coeur = document.createElement("img");
    coeur.setAttribute("src", "../../assets/icons/coeur.svg");
    coeur.setAttribute("alt", "Likes");
    coeur.setAttribute("tabindex", "0")

    

    GetMedia(imageContent);
    titreContent.appendChild(titre);
    titreContent.appendChild(likeContent);
    likeContent.appendChild(like);
    likeContent.appendChild(coeur);
    imageContent.appendChild(titreContent);

    imageContent.firstChild.addEventListener("click", e => {
      const clickInfo = e.originalTarget
      lightBox(image, video, clickInfo);
    });
    imageContent.addEventListener("keydown", e=>{
      if(e.key==="Enter"){
        const clickInfo = e.originalTarget
        lightBox(image, video, clickInfo);
      }
    })
    coeur.addEventListener("keydown",e=>{
      if(e.key==="Enter"){
        AddLike(like,coeur)
      }
    })
    coeur.addEventListener("click", () => {
      AddLike(like, coeur);
    });
 
    return imageContent
}

function GetMedia(imageContent) {
      if (image != null) {
        const photo = document.createElement("img");
        const imagePath = `${PhotoFolder}/${image}`;
        photo.setAttribute("src", imagePath);
        photo.setAttribute("alt", title);
        picturePath = {
          type: "image",
          path: image,
          alt: photo.alt,
          source: imagePath,
          title,
          like: likes,
          date,
        };
        imageContent.appendChild(photo);
        info.push(picturePath);
      } else {
        const movie = document.createElement("video");
        const moviePath = `${PhotoFolder}/${video}`;
        movie.setAttribute("src", moviePath);
        // movie.setAttribute("controls", " ")
        videoPath = {
          type: "video",
          path: video,
          source: moviePath,
          title: title,
          like: likes,
          date,
        };
        info.push(videoPath);
        imageContent.appendChild(movie);
      }
    }





return{title, image, video, likes, date, constructMedia }
}

// function PhotographerWork(data, photographFirstName) {
//   const { title, image, video, likes, date } = data;
//   const PhotoFolder = `assets/photographers/${photographFirstName}`;

//   function GetMedia(imageContent) {
//     if (image != null) {
//       const photo = document.createElement("img");
//       const imagePath = `${PhotoFolder}/${image}`;
//       photo.setAttribute("src", imagePath);
//       photo.setAttribute("alt", title);
//       picturePath = {
//         type: "image",
//         path: image,
//         alt: photo.alt,
//         source: imagePath,
//         title,
//         like: likes,
//         date,
//       };
//       imageContent.appendChild(photo);
//       info.push(picturePath);
//     } else {
//       const movie = document.createElement("video");
//       const moviePath = `${PhotoFolder}/${video}`;
//       movie.setAttribute("src", moviePath);
//       // movie.setAttribute("controls", " ")
//       videoPath = {
//         type: "video",
//         path: video,
//         source: moviePath,
//         title: title,
//         like: likes,
//         date,
//       };
//       info.push(videoPath);
//       imageContent.appendChild(movie);
//     }
//   }
//   //Avec cette fonction, je vais construire le visuel de la création d'une photo que je vais injecter dans le DOM
//   function constructMedia() {
//     const imageContent = document.createElement("div");
//     imageContent.classList.add("imageContent");
//     //Si image n'est pas null alors c'est une image

//     //Il faut aller chercher dans le tableau info les infos necessaire à l'affichage de la photo et ses infos
//     //C'est à dire, aller cherche l'image puis son titre et son nombre de like
//     const titreContent = document.createElement("div");
//     const titre = document.createElement("p");
//     titre.innerHTML = title;
//     titreContent.classList.add("titleContent");
//     const likeContent = document.createElement("div");
//     likeContent.classList.add("likeContent");

//     let like = document.createElement("p");
//     like.classList.add("nombreLike");
//     like.innerHTML = `${likes}`;
//     const coeur = document.createElement("img");
//     coeur.setAttribute("src", "../../assets/icons/coeur.svg");
//     coeur.setAttribute("alt", "Likes");

//     GetMedia(imageContent);
//     titreContent.appendChild(titre);
//     titreContent.appendChild(likeContent);
//     likeContent.appendChild(like);
//     likeContent.appendChild(coeur);
//     imageContent.appendChild(titreContent);

//     imageContent.firstChild.addEventListener("click", () => {
//       lightBox(image, video);
//     });
//     // coeur.classList.add("test")
//     coeur.addEventListener("click", () => {
//       AddLike(like, coeur);
//     });
//     return imageContent;
//   }

//   return { title, image, video, constructMedia, likes };
// }

// let likedBoolean = false;
// function AddLike(like, coeur) {
//   console.log(coeur);
//   console.log(coeur.className);
//   if (coeur.className == "liked") {
//     console.log("LIKE");
//     coeur.classList.remove("liked");
//     like.innerHTML = Number(like.textContent) - 1;
//   } else {
//     console.log(" Pas LIKE");
//     coeur.classList.add("liked");
//     like.innerHTML = Number(like.textContent) + 1;
//   }

//   const Like = document.querySelector(".likeContent .price");
//   const nmbersContent = document.querySelector(".price_content");
//   calculateLike(Like, nmbersContent);
// }

// function calculateLike(Like) {
//   const allLikes = document.querySelectorAll(".nombreLike");
//   let totalLike = 0;
//   allLikes.forEach((element) => {
//     totalLike = Number(element.textContent) + totalLike;
//   });
//   Like.innerHTML = totalLike;
// }
