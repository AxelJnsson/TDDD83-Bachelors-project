$(document).ready(function(){
<<<<<<< HEAD
=======

>>>>>>> 580b02d52d493e9612de14892601f5ef5319801a
    // Kod i detta block körs när dokumentet laddats klart.    
    $(".container").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
    $(".container").html($("#view-about").html())  

    e.preventDefault();
  });

$('#basketButton').click(function (e) {
  $("#basketModal").modal('toggle');
  e.preventDefault();
});
<<<<<<< HEAD
=======

$('#homeButton').click(function (e) {
  $(".container").html($("#view-home").html())  
    e.preventDefault();
});

>>>>>>> 580b02d52d493e9612de14892601f5ef5319801a
