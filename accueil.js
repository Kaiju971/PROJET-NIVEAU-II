var wrapper = document.querySelector('.marquee-wrapper'),
    marquee = document.querySelector('.marquee'),   
    wrapperWidth = wrapper.offsetWidth,
    marqueeWidth = marquee.scrollWidth/2;
    

    
function move() {
  var currentTX = getComputedStyle(marquee).transform.split(',');
  if( currentTX[4] === undefined ) {
    currentTX = -1;
  } else {
    currentTX = parseFloat(currentTX[4]) - 1;
  }
  
  if(-currentTX >= marqueeWidth) {
    marquee.style.transform = 'translateX(' + wrapperWidth + 'px)';
  
  } else {
    marquee.style.transform = 'translateX(' + currentTX + 'px)';
  }
}
var interval = setInterval(move, 5);



        // // Create a button element
        // const button = document.createElement('button');

        // // // Set the button text to 'Can you click me?'
        // button.innerText = 'Voir plus';

        // button.id = 'Button';

        // // Attach the "click" event to your button
        // button.addEventListener('click', () => {
        //   // When there is a "click"
        //   // it shows an alert in the browser
        //   alert('Oh, you clicked me!');
        // })

        //   // document.body.appendChild(button);

          const button1 = document.createElement('button');
          button1.innerText = 'Voir plus';
          button1.id = 'Button';

          const col1=document.querySelector(".col11");
          col1.appendChild(button1);
       
         button1.addEventListener('click', () => location = '../pages/inspirations.html');

        const button2 = document.createElement('button');
        button2.innerText = 'Voir plus';
        button2.id = 'Button';

        const col2=document.querySelector(".col22");
        col2.appendChild(button2);
     
       button2.addEventListener('click', () => location = '../pages/services.html');