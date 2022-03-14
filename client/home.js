$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
   
   
    $("#mainViewContainer").html($("#view-about").html())  
   
    e.preventDefault();
  });

  $('#allInstrButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("allt", null);
    e.preventDefault();
  });

  $('#guitarButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("gitarrer", null);
    e.preventDefault();
  });

  $('#pianoButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("pianon", null);
    e.preventDefault();
  });

  $('#drumButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("trummor", null);
    e.preventDefault();
  });

  $('#studioButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("studio", null);
    e.preventDefault();
  });

  $('#yamahaTestButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    showProdInfo("", "Yamaha");
    e.preventDefault();
  });

$('#homeButton').click(function (e) {
  $("#mainViewContainer").html($("#view-home").html())  
    e.preventDefault();
});


//testfunktion för filtrering
function checkItem(){
  var checkBox = document.getElementById("checkItem9");

  if (checkBox.checked == true) {
    alert("ja");
  }
}

