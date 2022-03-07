$(document).ready(function(){
<<<<<<< HEAD
    // Kod i detta block körs när dokumentet laddats klart.  
    alert("siddan laddades");
    $(".container").html($("#view-home").html())  
 });

$('#aboutButton').click(function (e) {
    e.preventDefault();
    alert("siddan kom hit");
    $(".container").html($("#view-about").html())  
  });
=======
    // Kod i detta block körs när dokumentet laddats klart.    
    $(".container").html($("#view-about").html())  
 })

$('#aboutButton').click(function (e) {
    $(".container").html($("#view-about").html())  
    e.preventDefault();
  });

$('#basketButton').click(function (e) {
  $("#basketModal").modal('toggle');
  e.preventDefault();
});
>>>>>>> c38a64ef3c7b7ce768761ab204d21eaacc57e33a
