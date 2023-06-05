const GridCell = (array, container) => {
  let cell = ``;
  array.map((element) => {
    cell =
      cell +
      `
        <div class="cell">
      <img
            src=${element.image}
            class="image"
            alt="..."
        />    
        <div class="text-image">${element.name}        
            <br />
            
        </div>
        
            
        </div> `;
  });
  container.innerHTML = cell;
};

var requestURL = "../src/database.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = () => {
  const products = request.response;
  showInspirations(products);
};

//page inspiration
const showInspirations = (array) => {
  const containerInspiration = document.querySelector(".container-inspiration");

  const inspiration = array?.filter(
    (product) => product.page === "inspiration"
  );

  const openImage = (image) => {
    image;
  };

  if (containerInspiration) {
    const image = document.createElement("div");
    image.style.background = `url(${inspiration[0].image})`;
    image.style.backgroundSize = `cover`;
    image.style.backgroundRepeat = `no-repeat`;
    containerInspiration.appendChild(image);

    const containerProd = document.createElement("div");
    containerProd.className = "container-prod";
    const title = document.createElement("h1");
    title.textContent = "Nos inspirations";
    containerProd.appendChild(title);

    const inspiration1 = inspiration?.filter((product, index) => index > 0);

    inspiration1.map((element) => {
      let cell = document.createElement("div");
      cell.className = "cell";
      const imag = document.createElement("img");
      imag.className = "img" + element.id;
      imag.src = element.image;
      let cellTexte = document.createElement("h4");
      cellTexte.textContent = element.name;
      cell.appendChild(imag);
      cell.appendChild(cellTexte);
      containerProd.appendChild(cell);
    });

    containerInspiration.appendChild(containerProd);
    containerInspiration.innerHTML = containerInspiration.innerHTML + `</div>`;

    inspiration1.map((element) => {
      const myImage = document.querySelector(".img" + element.id);
      myImage.addEventListener("click", () => openImage(element));
    });
  }
};

// //articles
// const containerArticles = document.querySelector("#articles");
// const articles = products.filter((product) => product.type === "articles");
// if (containerArticles) GridCell(articles, containerArticles);

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
