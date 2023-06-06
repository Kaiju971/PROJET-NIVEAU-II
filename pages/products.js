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

const panier = () => {
  console.log("hello, world");
};

const showPage = (array, page, container, titleMain) => {
  const pageArray = array?.filter((product) => product.page === page);

  const pageArrayWithoutFirst = pageArray?.filter(
    (product, index) => index > 0
  );

  const openImage = (imageId) => {
    const idPict = ".img" + imageId;
    const idPictWithoutDot = idPict.replace(".", "");
    const idPictScale = idPictWithoutDot + " scale";

    const picture = document.querySelector(idPict);
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
        (item, index) => index > 0 && item.className !== idPictWithoutDot
      );

      pictures1.forEach((element) => {
        element.style.filter = "blur(0px)";
      });
      textArray.forEach((element) => {
        element.style.filter = "blur(0px)";
      });
      picture.className = picture.className.replace(" scale", "");
      discr.style.display = "none";
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

      const titleDiscr = document.createElement("h5");
      titleDiscr.textContent = texteDiscr[0];
      titleDiscr.style.fontSize = "1rem";
      titleDiscr.style.fontWeight = "900";
      cellDiscription.appendChild(titleDiscr);

      texteDiscr.map((item, index) => {
        if (index > 0) {
          const el = document.createElement("h6");
          el.textContent = item;
          el.style.fontSize = "0.5rem";
          el.style.fontWeight = "400";
          cellDiscription.appendChild(el);
        }
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
      butt.style.width = "5rem";
      butt.style.height = "2rem";
      butt.style.marginLeft = "3.5rem";
      butt.textContent = "AJOUTER";

      // butt.addEventListener("click", () => console.log("Hi"));
      cellDiscription.appendChild(butt);

      cellDiscription.style.display = "none";

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
      myImage.addEventListener("click", () => openImage(element.id));
    });
  }
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
