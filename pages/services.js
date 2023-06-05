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
    (function(){
      const carousel = {
        element: document.querySelector('#carousel'),
        images: document.querySelectorAll('#carousel li'),
        tick: 10,
        pause: 3000,
      }
  
      //инициализация
      for(let i = 0; i < carousel.images.length; ++i){
        console.log(carousel.element.offsetWidth*i);
          carousel.images[i].left = carousel.element.offsetWidth/2 * i;
          carousel.images[i].style.left = carousel.images[i].left + 'px';
      }
  
      //анимация смещения
      let j = 0, step = carousel.element.offsetWidth/2;
      function animation(){
        if( j < step){
          j += 2;
          for(let i = 0; i < carousel.images.length; ++i){
            carousel.images[i].left -= 2;
            carousel.images[i].style.left = carousel.images[i].left + 'px';
          }
      
         setTimeout(animation, carousel.tick)
        } else {
          for(let i = 0; i < carousel.images.length; i++){
            if(  carousel.images[i].left == -carousel.element.offsetWidth ){
              carousel.images[i].left = carousel.element.offsetWidth * (carousel.images.length-1)
              break;
            }
          }
  
          j = 0;
          setTimeout(animation, carousel.pause);
        }
      }
      animation();
  
    })();