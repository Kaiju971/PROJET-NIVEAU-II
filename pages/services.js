var captionSel = document.querySelectorAll('.caption');

for (let i = 0; i < captionSel.length; i++) {
  let image = captionSel[i].querySelector(":scope > .caption-image");
  let text = captionSel[i].querySelector(":scope > .caption-text");
  text.style.width = image.clientWidth - 20 + "px";
  captionSel[i].style.height = image.clientHeight + "px";
}