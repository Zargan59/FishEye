function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement("a")
        a.setAttribute("href",'./photographer.html?id=' + id)
        a.setAttribute("aria-label", `Page de ${name} ` )
        const article = document.createElement( 'article' );
        
    //Photo de profil
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

    //Nom du profil
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

    //Lieux du photographe
        const location = document.createElement('p')
        location.classList.add("location")
        location.textContent = `${city}, ${country} `

    //Phrase d'accroche
        const quote = document.createElement("p")
        quote.classList.add("quote")
        quote.textContent = tagline

    //Tarif
        const tarif = document.createElement("p")
        tarif.classList.add("price")
        tarif.textContent = `${price}€/jour `

        article.appendChild(a)
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(location)
        a.appendChild(quote)
        a.appendChild(tarif)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}