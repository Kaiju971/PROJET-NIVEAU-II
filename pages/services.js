var captionSel = document.querySelectorAll('.caption');

for (let i = 0; i < captionSel.length; i++) {
  let image1 = captionSel[i].querySelector(":scope > .caption-image1");
  let image2 = captionSel[i].querySelector(":scope > .caption-image2");
  text.style.width = image.clientWidth - 20 + "px";
  captionSel[i].style.height = image.clientHeight + "px";
}