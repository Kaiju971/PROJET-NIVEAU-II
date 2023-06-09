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

    const picture = document.querySelector(idPict); //cell-img
    const discr = picture.querySelector(".discription");
    const pictures = document.querySelectorAll("img");
    const pictArray = Array.from(pictures);

    const cellTexte = document.querySelectorAll("h4");
    const textArray = Array.from(cellTexte);

    let anim;
    if (imageId.includes("first")) anim = "scale(2.5) translate(13vw,5vh)";
    else if (imageId.includes("second")) anim = "scale(2.5) translate(0,5vh)";
    else if (imageId.includes("third"))
      anim = "scale(2.5) translate(-13vw,5vh)";
    else if (imageId.includes("forth"))
      anim = "scale(2.5) translate(13vw, -10vh)";
    else if (imageId.includes("fifth")) anim = "scale(2.5) translate(0, -10vh)";
    else if (imageId.includes("sixth"))
      anim = "scale(2.5) translate(-13vw, -10vh)";

    if (!picture.className.includes("scale")) {
      picture.className = picture.className + " scale";
      picture.style.zIndex = "10";
      discr.style.zIndex = "10";
      discr.style.display = "flex";

      var animation = picture.animate([{ transform: anim }], 500);
      animation.addEventListener("finish", () => {
        picture.style.transform = anim;
      });

      const pictures1 = pictArray?.filter(
        (item, index) => index > 0 && item.className.includes("scale")
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

      const pictures1 = pictArray?.filter(
        (item, index) => index > 0 && item.className.includes("scale")
      );

      pictures1.forEach((element) => {
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
    image.style.background = `url(${pageArray[0].image})`;
    image.style.backgroundSize = `cover`;
    image.style.backgroundRepeat = `no-repeat`;
    container.appendChild(image);

    const containerProd = document.createElement("div");
    containerProd.className = "container-prod";
    const title = document.createElement("h1");
    title.textContent = titleMain;
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
      //imag.className = "img" + element.id;
      imag.src = element.image;
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
    });

    if (page === "produits") {
      const myButtons = document.querySelectorAll(".butt-panier");
      myButtons.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("Bascet");
        });
      });

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

  //console.log(arrayShow);
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

// //biju
// const containerBiju = document.querySelector("#biju");
// const biju = products.filter((product) => product.type === "biju");
// if (containerBiju) GridCell(biju, containerBiju);

// //orniment
// const containerOrniment = document.querySelector("#orniment");
// const orniment = products.filter((product) => product.type === "orniment");
// if (containerOrniment) GridCell(orniment, containerOrniment);

// //semi
// const containerSemi = document.querySelector("#semi");
// const semi = products.filter((product) => product.type === "semi");
// if (containerSemi) GridCell(semi, containerSemi);

// /////basket////////
// function saveBasket(basket) {
//   localStorage.setItem("basket", JSON.stringify(basket));
// }

// function getBasket() {
//   let basket = localStorage.getItem("basket");
//   if (basket == null) {
//     return [];
//   } else {
//     return JSON.parse(basket);
//   }
// }

// function addBasket(product) {
//   alert("le produit  " + product.name + " ajouté au panier");
//   let basket = getBasket();

//   let foundProduct = "";
//   if (Object.keys(basket).length) {
//     foundProduct = basket.find((p) => p.id == product.id);
//   }
//   if (foundProduct != undefined && foundProduct != "") {
//     foundProduct.quantity++;
//   } else {
//     product.quantity = 1;
//     basket.push(product);
//   }
//   saveBasket(basket);
// }

// function removeFromBasket(product) {
//   let basket = getBasket();
//   basket = basket.filter((p) => p.id != product.id);
//   saveBasket(basket);
// }

// function changeQuantity(product, quantity) {
//   let basket = getBasket();
//   let foundProduct = basket.find((p) => p.id != product.id);
//   if (foundProduct != undefined) {
//     foundProduct.quantity += quantity;
//     if (foundProduct.quantity <= 0) {
//       removeFromBasket(foundProduct);
//     } else {
//       saveBasket(basket);
//     }
//   }
// }

// function getNumberProduct() {
//   let basket = getBasket();
//   let number = 0;
//   for (let product of basket) {
//     number += product.quantity;
//   }
//   return number;
// }
// function getTotalPrice() {
//   let basket = getBasket();
//   let total = 0;
//   for (let product of basket) {
//     total += product.quantity * product.price;
//   }
//   return total;
// }

// //shoppingcart
// const containerShoppingcart = document.getElementById("datacart");
// const shopCart = getBasket();
// let cell1 = ``;
// shopCart.forEach((element) => {
//   cell1 =
//     cell1 +
//     `

//         <div class="cell">${element.name}</div>
//         <div class="cell">${element.quantity}in </div>
//         <div class="cell">${element.price}€ </div>

//         `;
// });
// containerShoppingcart.innerHTML = cell1;
