<<<<<<< HEAD
//refaktorerad

=======
//REFAKTORERAD
//functions for slideshow on homepage
>>>>>>> 3813c0a363fe212f77112d881a43ff686392fc9c
let slideIndex = 1;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;
<<<<<<< HEAD
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}
=======
  
  if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
  }
>>>>>>> 3813c0a363fe212f77112d881a43ff686392fc9c

// Next/previous controls
function plusSlides(n) {
  nextSlides(slideIndex += n);
}

function nextSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
<<<<<<< HEAD
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
=======
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}

>>>>>>> 3813c0a363fe212f77112d881a43ff686392fc9c
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
<<<<<<< HEAD
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
=======

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
>>>>>>> 3813c0a363fe212f77112d881a43ff686392fc9c
