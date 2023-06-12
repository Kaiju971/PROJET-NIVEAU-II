const form = document.querySelector("#form");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const sujet = document.querySelector("#sujet");
const messageInput = document.querySelector("#message");
console.log("messageInput "+messageInput);
const output = document.querySelector("#output");

const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(messageInput) {
  const ok = re.exec(messageInput.value);

  output.textContent = ok
    ? `Merci, votre message est ${ok[0]}`
    : `${messageInput.value} information incomplète!`;
}

form.addEventListener("submit", (event) => {
   

  event.preventDefault();
  testInfo(messageInput);
});