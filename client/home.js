$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $(".container").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
    $(".container").html($("#view-about").html())  
      alert("JAAA")
    e.preventDefault();
  });

$('#basketButton').click(function (e) {
  $("#basketModal").modal('toggle');
  e.preventDefault();
});

$('#homeButton').click(function (e) {
  $(".container").html($("#view-home").html())  
    e.preventDefault();
});

