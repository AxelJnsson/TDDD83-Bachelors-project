$(document).ready(function(){
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
