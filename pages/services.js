// I will be creating a different pen with touch support but right // now I have no time for it due to school

  // const slider = document.querySelector(".items");
	// 	const slides = document.querySelectorAll(".item");
	// 	const button = document.querySelectorAll(".button");

	// 	let current = 0;
	// 	let prev = 3;
	// 	let next = 1;

	// 	for (let i = 0; i < button.length; i++) {
	// 		button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
	// 	}

	// 	const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

	// 	const gotoNext = () => current < 2 ? gotoNum(current + 1) : gotoNum(0);

	// 	const gotoNum = number => {
	// 		current = number;
	// 		prev = current - 1;
	// 		next = current + 1;

	// 		for (let i = 0; i < slides.length; i++) {
	// 			slides[i].classList.remove("active");
	// 			slides[i].classList.remove("prev");
	// 			slides[i].classList.remove("next");
	// 		}

	// 		if (next === 3) {
	// 			next = 0;
	// 		}

	// 		if (prev === -1) {
	// 			prev = 3;
	// 		}

	// 		slides[current].classList.add("active");
	// 		slides[prev].classList.add("prev");
	// 		slides[next].classList.add("next");
	// 	}//







    // (function(){
    //   const carousel = {
    //     element: document.querySelector('#carousel'),
    //     images: document.querySelectorAll('#carousel li'),
    //     tick: 10,
    //     pause: 3000,
    //   }
  
    //   //инициализация
    //   for(let i = 0; i < carousel.images.length; ++i){
    //     console.log(carousel.element.offsetWidth*i);
    //       carousel.images[i].left = carousel.element.offsetWidth/2 * i;
    //       carousel.images[i].style.left = carousel.images[i].left + 'px';
    //   }
  
    //   //анимация смещения
    //   let j = 0, step = carousel.element.offsetWidth;
    //   function animation(){
    //     if( j < step){
    //       j += 2;
    //       for(let i = 0; i < carousel.images.length; ++i){
    //         carousel.images[i].left -= 2;
    //         carousel.images[i].style.left = carousel.images[i].left + 'px';
    //       }
      
    //      setTimeout(animation, carousel.tick)
    //     } else {
    //       for(let i = 0; i < carousel.images.length; i++){
    //         if(  carousel.images[i].left === -carousel.element.offsetWidth ){
    //           carousel.images[i].left = carousel.element.offsetWidth * (carousel.images.length-1)
    //           break;
    //         }
    //       }
  
    //       j = 0;
    //       setTimeout(animation, carousel.pause);
    //     }
    //   }
    //   animation();
  
    // })();



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