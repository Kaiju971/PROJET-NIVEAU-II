
    let slideIndex = 1;
    let myTimer;
    let slideshowContainer;
    let pause;
    let resume;


window.addEventListener("load",() =>{
    showSlides(slideIndex);
    myTimer = setInterval(()=>{plusSlides(1)}, 4000);
  
    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];
    
    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];
  
    slideshowContainer.addEventListener('mouseenter', pause)
    slideshowContainer.addEventListener('mouseleave', resume)
})
// NEXT AND PREVIOUS CONTROL
    const plusSlides=(n)=>{
      
      clearInterval(myTimer);
      if (n < 0){
        showSlides(slideIndex -= 1);
      } else {
        showSlides(slideIndex += 1); 
      }
      //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
      if (n === -1){
        myTimer = setInterval(()=>{plusSlides(n + 2)}, 4000);
      } else {
        myTimer = setInterval(()=>{plusSlides(n + 1)}, 4000);
      }
    }
    const showSlides=(n)=>{
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
 
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }
    window.addEventListener("load",()=>{
      showSlides(slideIndex);
      myTimer = setInterval(()=>plusSlides(1), 4000);
  })

//Controls the current slide and resets interval if needed
  const currentSlide=(n)=>{
    clearInterval(myTimer);
    myTimer = setInterval(()=>(plusSlides(n + 1)), 4000);
    showSlides(slideIndex = n);
  }

slideshowContainer = document.getElementsByClassName('slideshow-container')[0];slideshowContainer.addEventListener('mouseenter', pause);
slideshowContainer.addEventListener('mouseleave', resume);
pause = () => {
  clearInterval(myTimer);
}
resume = () =>{
  clearInterval(myTimer);
  myTimer = setInterval(()=>(plusSlides(slideIndex)), 4000);
}


function CheckBoxShortList(x,y,z) {
  //  var slide = '';
   var arr = [];
   arr.push(x + ',' + y + ',' + z); // length is 1
   console.log(arr);
   console.log('Length:', arr.length);
  
}


// function CheckBoxShortList('Nos modes de paiement') {
//   var slide = '';
//   var arr = [];
//   arr.push(x + ',' + y + ',' + z); // length is 1
//   console.log(arr);
//   console.log('Length:', arr.length);
// }