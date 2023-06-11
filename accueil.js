var wrapper = document.querySelector(".marquee-wrapper"),
  marquee = document.querySelector(".marquee"),
  wrapperWidth = wrapper.offsetWidth,
  marqueeWidth = marquee.scrollWidth / 2;

function move() {
  var currentTX = getComputedStyle(marquee).transform.split(",");
  if (currentTX[4] === undefined) {
    currentTX = -1;
  } else {
    currentTX = parseFloat(currentTX[4]) - 1;
  }

  if (-currentTX >= marqueeWidth) {
    marquee.style.transform = "translateX(" + wrapperWidth + "px)";
  } else {
    marquee.style.transform = "translateX(" + currentTX + "px)";
  }
}
var interval = setInterval(move, 5);

const button1 = document.createElement("button");
button1.innerText = "Voir plus";
button1.id = "Button";

const col1 = document.querySelector(".col11");
col1.appendChild(button1);

button1.addEventListener(
  "click",
  () => (location = "../pages/inspirations.html")
);

const button2 = document.createElement("button");
button2.innerText = "Voir plus";
button2.id = "Button";

const col2 = document.querySelector(".col22");
col2.appendChild(button2);

button2.addEventListener("click", () => (location = "../pages/services.html"));

const showTexteBasket = () => {
  const contTexte = document.querySelector(".container-texte");
  contTexte.style.display = "flex";
  contTexte.style.justifyContent = "space-between";
  contTexte.style.backgroundColor = "var(--third-color)";
  contTexte.style.height = "10rem";
  contTexte.style.paddingLeft = "40rem";
  const texte = document.createElement("div");
  texte.textContent = "Votre Panier a été validé avec succés !";
  texte.style.marginTop = "5rem";
  texte.style.fontSize = "2rem";
  texte.style.color = "var(--font-color-blanche)";
  const charClose = document.createElement("div");
  charClose.innerHTML = "&times;";
  charClose.style.marginTop = "5rem";
  charClose.style.fontSize = "2rem";
  charClose.style.color = "var(--font-color-blanche)";
  charClose.style.cursor = "pointer";
  contTexte.appendChild(texte);
  contTexte.appendChild(charClose);
  charClose.addEventListener("click", () => (location = "./index.html"));
};

if (document.referrer === "http://127.0.0.1:5500/pages/panier.html")
  showTexteBasket();
