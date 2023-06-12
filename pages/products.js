import * as basket from "./panier.js";

const typesDecor = ["confort", "surface", "decoration"];

var requestURL = "../src/database.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = () => {
  const products = request.response;
  showInspirations(products, "inspiration");
  showProduits(products, "produits");
};

const showPage = (array, page, container, titleMain) => {
  const pageArray = array?.filter((product) => product.page === page);

  const pageArrayWithoutFirst = pageArray?.filter(
    (product, index) => index > 0
  );

  const openImage = (imageId) => {
    const idPict = ".img" + imageId;
    const idCellPict = ".cell-img.img" + imageId;

    const picture = document.querySelector(idPict); //cell-img
    const discr = picture.querySelector(".discription");

    const cellTexte = document.querySelectorAll("h4");
    const textArray = Array.from(cellTexte);

    let anim;
    if (window.matchMedia("(min-width: 1100px)").matches) {
      if (imageId.includes("first")) anim = "scale(2.5) translate(13vw,5vh)";
      else if (imageId.includes("second")) anim = "scale(2.5) translate(0,5vh)";
      else if (imageId.includes("third"))
        anim = "scale(2.5) translate(-13vw,5vh)";
      else if (imageId.includes("forth"))
        anim = "scale(2.5) translate(13vw, -10vh)";
      else if (imageId.includes("fifth"))
        anim = "scale(2.5) translate(0, -10vh)";
      else if (imageId.includes("sixth"))
        anim = "scale(2.5) translate(-13vw, -10vh)";
    } else {
      if (imageId.includes("first")) anim = "scale(2.5) translate(10vw,5vh)";
      else if (imageId.includes("second"))
        anim = "scale(2.5) translate(-10vw,5vh)";
      else if (imageId.includes("third")) anim = "scale(2.5) translate(10vw,0)";
      else if (imageId.includes("forth"))
        anim = "scale(2.5) translate(-10vw,0)";
      else if (imageId.includes("fifth"))
        anim = "scale(2.5) translate(10vw,-5vh)";
      else if (imageId.includes("sixth"))
        anim = "scale(2.5) translate(-10vw,-5vh)";
    }
    if (!picture.className.includes("scale")) {
      picture.className = picture.className + " scale";
      picture.style.zIndex = "10";
      discr.style.zIndex = "10";
      discr.style.display = "flex";

      var animation = picture.animate([{ transform: anim }], 500);
      animation.addEventListener("finish", () => {
        picture.style.transform = anim;
      });

      const pictures = document.querySelectorAll(".cell-img");
      const pictArray = Array.from(pictures);

      const pictures1 = pictArray?.filter(
        (item, index) => !item.className.includes("scale")
      );

      pictures1.forEach((element) => {
        element.style.filter = "blur(4px)";
        element.style.zIndex = "0";
      });
      textArray.forEach((element) => {
        element.style.filter = "blur(4px)";
        element.style.zIndex = "0";
      });
    } else {
      var animation = picture.animate(
        [{ transform: "scale(1) translate(0)" }],
        500
      );
      animation.addEventListener("finish", () => {
        picture.style.transform = "scale(1) translate(0)";
      });

      const pictures = document.querySelectorAll(".cell-img");
      const pictArray = Array.from(pictures);

      pictArray.forEach((element) => {
        element.style.filter = "blur(0px)";
        element.style.zIndex = "0";
      });
      textArray.forEach((element) => {
        element.style.filter = "blur(0px)";
        element.style.zIndex = "0";
      });
      picture.className = picture.className.replace(" scale", "");
      picture.style.zIndex = "10";
      discr.style.zIndex = "10";
      discr.style.display = "none";
      window.setTimeout(() => (picture.style.zIndex = "0"), 500);
    }
  };

  if (container) {
    const image = document.createElement("div");
    image.className = "img-header";
    image.style.background = `url(${pageArray[0].image})`;
    image.style.backgroundSize = `100% 100%`;
    image.style.backgroundRepeat = `no-repeat`;
    container.appendChild(image);

    const containerProd = document.createElement("div");
    containerProd.className = "container-prod ";
    const title = document.createElement("h1");
    title.textContent = titleMain;
    title.id = "anhor";
    containerProd.appendChild(title);

    if (page === "produits") {
      const filter = document.createElement("div");
      filter.className = "filter";
      const buttFilter = document.createElement("button");
      buttFilter.className = "button-filter";
      buttFilter.textContent = "Filtre";
      const containerDropdawn = document.createElement("div");
      containerDropdawn.id = "myDropdown";
      containerDropdawn.className = "dropdown-content";
      filter.appendChild(buttFilter);
      filter.appendChild(containerDropdawn);

      typesDecor.map((elem, index) => {
        const item = document.createElement("a");
        item.href = "#" + elem;
        item.textContent = elem;
        item.className = "item" + index;
        containerDropdawn.appendChild(item);
      });

      containerProd.appendChild(filter);
    }

    pageArrayWithoutFirst.map((element) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      const cellImg = document.createElement("div");
      cellImg.className = "cell-img img" + element.id;
      const imag = document.createElement("img");
      imag.src = element.image;
      imag.className = "imag" + element.id;
      const cellDiscription = document.createElement("div");
      cellDiscription.className = "discription";
      const texteDiscr = element.discription.split("\n");

      if (element.page === "produits") {
        const titleDiscr = document.createElement("h5");
        titleDiscr.textContent = element.name;
        titleDiscr.style.fontSize = "1rem";
        titleDiscr.style.fontWeight = "900";
        cellDiscription.appendChild(titleDiscr);

        texteDiscr.map((item, index) => {
          const el = document.createElement("h6");
          el.textContent = item;
          el.style.fontSize = "0.5rem";
          el.style.fontWeight = "400";
          el.style.lineHeight = 0.5;
          cellDiscription.appendChild(el);
        });
        const br = document.createElement("br");
        cellDiscription.appendChild(br);
        const br1 = document.createElement("br");
        cellDiscription.appendChild(br1);

        const prix = document.createElement("h5");
        prix.textContent = element.price + "€";
        cellDiscription.appendChild(prix);

        const butt = document.createElement("button");
        butt.className = "butt-panier";
        butt.style.width = "8rem";
        butt.style.height = "2rem";
        butt.style.marginLeft = "1.3rem";
        butt.textContent = "AJOUTER";
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-cart-shopping";
        butt.appendChild(icon);

        cellDiscription.appendChild(butt);
        cellDiscription.style.display = "none";
      }

      let cellTexte = document.createElement("h4");
      cellTexte.textContent = element.name;

      cellImg.appendChild(imag);
      cellImg.appendChild(cellDiscription);
      cell.appendChild(cellImg);
      cell.appendChild(cellTexte);
      containerProd.appendChild(cell);
    });

    container.appendChild(containerProd);
    container.innerHTML = container.innerHTML + `</div>`;

    pageArrayWithoutFirst.map((element) => {
      const myImage = document.querySelector(".img" + element.id);
      myImage.addEventListener("click", (e) => openImage(element.id));

      if (page === "produits") {
        const myButton = myImage.querySelector(".butt-panier");
        myButton.addEventListener("click", (e) => {
          e.stopPropagation();
          basket.addBasket(element);
        });
      }
    });

    if (page === "produits") {
      const buttFilter = document.querySelector(".button-filter");
      buttFilter.addEventListener("click", (e) => {
        const contDropdawn = document.querySelector(".dropdown-content");
        contDropdawn.classList.toggle("show");
      });

      typesDecor.map((elem, index) => {
        const buttDrop = document.querySelector(".item" + index);
        buttDrop.addEventListener("click", (e) => {
          // filtration(elem, pageArrayWithoutFirst)
        });
      });
    }
  }
};

const showDropdown = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

const filtration = (item, array) => {
  // const arrayHide = array?.filter((el) => el.type !== item);
  array.map((el, index) => {
    if (el.type !== item) {
      elHTML = document.querySelector("cell-img " + el.id);
      elHTML.className.toggle("hideFilter");
    }
  });
};

//page inspiration
const showInspirations = (array, page) => {
  const containerInspiration = document.querySelector(".container-inspiration");
  showPage(array, page, containerInspiration, "Nos inspirations");
};

//page produits
const showProduits = (array, page) => {
  const containerProduits = document.querySelector(".container-produits");
  showPage(array, page, containerProduits, "Produits");
};

//page panier

const containerShoppingcartEmpty = document.querySelector(
  ".container-shoppingcardvide"
);
if (containerShoppingcartEmpty) {
  const containerShoppingcart = document.querySelector(
    ".container-shoppingcard"
  );

  const shopCart = basket.getBasket();
  if (shopCart.length) {
    const priceForItem = (quantity, price) => quantity * price;

    const conttitlePanier = document.createElement("div");
    conttitlePanier.className = "text-vide";
    const titlePanier = document.createElement("h1");
    titlePanier.className = "title-panier";
    titlePanier.textContent = "Panier";
    const subtitlePanier = document.createElement("div");
    subtitlePanier.className = "continue";
    subtitlePanier.textContent = "Continue vos achats >>";

    conttitlePanier.appendChild(titlePanier);
    conttitlePanier.appendChild(subtitlePanier);
    containerShoppingcartEmpty.appendChild(conttitlePanier);

    subtitlePanier.addEventListener("click", (e) => {
      location.href = "./produits.html#anhor";
    });

    shopCart.forEach((element) => {
      const imag = document.createElement("img");
      imag.src = element.image;
      imag.style.width = "18rem";
      imag.style.height = "14rem";
      const nameDescr = document.createElement("div");
      nameDescr.className = "nameDescr";
      const name = document.createElement("div");
      name.textContent = element.name;
      name.className = "name";
      const descr = document.createElement("div");
      descr.textContent = element.discription.split("\n")[0];
      const charQuant = document.createElement("div");
      charQuant.className = "container-quantity";
      const charDiv1 = document.createElement("div");
      charDiv1.innerHTML = "&#9652;";
      charDiv1.className = "char charDiv1" + element.id;
      const quant = document.createElement("div");
      quant.textContent = element.quantity;
      quant.className = "quant" + element.id;
      const charDiv2 = document.createElement("div");
      charDiv2.innerHTML = "&#9662";
      charDiv2.className = "char charDiv2" + element.id;
      const price = document.createElement("div");
      price.textContent = priceForItem(element.quantity, element.price);
      price.className = "price" + element.id;
      const euro = document.createElement("div");
      euro.textContent = " € ";
      euro.alignText = "left";

      nameDescr.appendChild(name);
      nameDescr.appendChild(descr);
      charQuant.appendChild(charDiv1);
      charQuant.appendChild(quant);
      charQuant.appendChild(charDiv2);
      containerShoppingcart.appendChild(imag);
      containerShoppingcart.appendChild(nameDescr);
      containerShoppingcart.appendChild(charQuant);
      containerShoppingcart.appendChild(price);
      containerShoppingcart.appendChild(euro);
    });

    const contTotal = document.createElement("div");
    contTotal.className = "total";
    let total = basket.getTotalPrice();
    const text1 = document.createElement("div");
    text1.textContent = " Total ";
    const text2 = document.createElement("div");
    text2.textContent = total + " € ";

    const contButton = document.createElement("div");
    contButton.className = "cont-button";
    const buttTotal = document.createElement("div");
    buttTotal.textContent = "Valider le panier";
    buttTotal.className = "butt-total";

    contTotal.appendChild(text1);
    contTotal.appendChild(text2);
    containerShoppingcart.appendChild(contTotal);
    contButton.appendChild(buttTotal);
    containerShoppingcart.appendChild(contButton);

    shopCart.forEach((element) => {
      const foundProduct = shopCart.find((p) => p.id == element.id);
      let quantityBasket = foundProduct?.quantity;
      let quantity = 0;
      const charDiv1 = document.querySelector(".charDiv1" + element.id);
      const charDiv2 = document.querySelector(".charDiv2" + element.id);
      const qualHTML = document.querySelector(".quant" + element.id);
      const priceHTML = document.querySelector(".price" + element.id);

      const Props = {
        element: element,
        quantity: quantity,
        quantityBasket: quantityBasket,
        elementPrice: element.price,
        qualHTML: qualHTML,
        priceHTML: priceHTML,
      };

      charDiv1.addEventListener("click", (e) => {
        if (e.target === charDiv1) {
          dataPanier(Props, 1);
        }
      });
      charDiv2.addEventListener("click", (e) => {
        if (e.target === charDiv2) {
          dataPanier(Props, -1);
        }
      });
    });

    const dataPanier = (Props, plusOne) => {
      Props.quantity += plusOne;
      let quantityForItem = (Props.quantityBasket += plusOne);
      Props.qualHTML.innerHTML = quantityForItem;
      Props.priceHTML.innerHTML = priceForItem(
        quantityForItem,
        Props.elementPrice
      );
      basket.changeQuantity(Props.element, Props.quantity);
      total = basket.getTotalPrice();
      text2.textContent = total + " € ";
    };

    const buttTotal1 = document.querySelector(".butt-total");
    buttTotal1.addEventListener("click", (e) => {
      basket.emptyBasket();
      location.reload();
    });
  } else {
    //panier vide

    const conttitlePanier = document.createElement("div");
    conttitlePanier.className = "text-vide";
    const titlePanier = document.createElement("h1");
    titlePanier.className = "title-panier";
    titlePanier.textContent = "Votre panier est vide";
    titlePanier.style.fontSize = "1.4rem";
    const subtitlePanier = document.createElement("div");
    subtitlePanier.className = "continue";
    subtitlePanier.textContent = "Continue vos achats >>";

    const imag = document.createElement("img");
    imag.src = "../images/PanierVide.PNG";
    imag.style.width = "12rem";
    imag.style.height = "10rem";
    imag.style.marginRight = "3rem";

    conttitlePanier.appendChild(titlePanier);
    conttitlePanier.appendChild(subtitlePanier);
    containerShoppingcartEmpty.appendChild(imag);
    containerShoppingcartEmpty.appendChild(conttitlePanier);

    subtitlePanier.addEventListener("click", (e) => {
      imag.style.display = "none";
      conttitlePanier.style.display = "none";
      const spin = document.createElement("div");
      spin.className = "loader";
      containerShoppingcartEmpty.appendChild(spin);
      setTimeout(redirect, 2000);
    });
  }
}
const redirect = () => {
  location.href = "../index.html";
};
