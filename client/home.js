$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.  
    alert("siddan laddades");
    $(".container").html($("#view-home").html())  
 });

$('#aboutButton').click(function (e) {
    e.preventDefault();
    alert("siddan kom hit");
    $(".container").html($("#view-about").html())  
  });