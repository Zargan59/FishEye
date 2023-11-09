
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
            // et bien retourner le tableau photographers seulement une fois récupéré
            const dataRequest = await fetch("../../data/photographers.json")
            const data = await dataRequest.json()
                return ({
                    photographers: data.photographers })
        }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            //Permet d'afficher le nom et la photo du photographe
            const photographerModel = photographerTemplate(photographer);
            //Permet d'afficher le DOM du photographe
            const userCardDOM = photographerModel.getUserCardDOM();
            // console.log(userCardDOM);
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
