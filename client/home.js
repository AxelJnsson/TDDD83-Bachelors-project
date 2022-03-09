$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $(".container").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
   
   
    $(".container").html($("#view-about").html())  
<<<<<<< HEAD
      alert("JAAA")
=======
   
    e.preventDefault();
  });

  $('#gitarButton2').click(function (e) {   
    $(".container").html($("#view-product").html())  

>>>>>>> e4eca530da18a712d415bb3368edbc112e5f1d4f
    e.preventDefault();
  });


$('#homeButton').click(function (e) {
  $(".container").html($("#view-home").html())  
    e.preventDefault();
});


