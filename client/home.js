$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    alert("siddan laddades");
    $(".container").html($("#view-about").html())  
 })

$('#aboutButton').click(function (e) {
    alert("siddan kom hit");
    $(".container").html($("#view-about").html())  
    e.preventDefault();
  });