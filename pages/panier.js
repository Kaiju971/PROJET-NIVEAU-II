/////basket////////
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

const addBasket = (product) => {
  alert("le produit  " + product.name + " ajouté au panier");
  let basket = getBasket();

  let foundProduct = "";
  if (Object.keys(basket).length) {
    foundProduct = basket.find((p) => p.id == product.id);
  }
  if (foundProduct != undefined && foundProduct != "") {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
};

export default addBasket;

function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product.id);
  saveBasket(basket);
}

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id != product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
}

function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
}
function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  return total;
}

//shoppingcart
const containerShoppingcart = document.getElementById("datacart");
const shopCart = getBasket();
let cell1 = ``;
shopCart.forEach((element) => {
  cell1 =
    cell1 +
    `

        <div class="cell">${element.name}</div>
        <div class="cell">${element.quantity}in </div>
        <div class="cell">${element.price}€ </div>

        `;
});
containerShoppingcart.innerHTML = cell1;
