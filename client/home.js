$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
   
   
    $("#mainViewContainer").html($("#view-about").html())  
   
    e.preventDefault();
  });

  $('#gitarButton2').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  

    e.preventDefault();
  });


$('#homeButton').click(function (e) {
  $("#mainViewContainer").html($("#view-home").html())  
    e.preventDefault();
});



