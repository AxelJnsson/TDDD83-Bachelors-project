$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())  
 })

 var filterCategory, filterBrand, filterModel, filterColor, filterName, filterPrice, filterYear;

$('#aboutButton').click(function (e) {
   
   
    $("#mainViewContainer").html($("#view-about").html())  
   
    e.preventDefault();
  });

  $('#allInstrButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    filterCategory = undefined;
    filterColor = undefined;
    filterName = undefined;
    filterPrice = undefined; 
    filterYear = undefined;
    filterModel = undefined;
    filterBrand = undefined;  
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
    e.preventDefault();
  });

  $('#guitarButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    filterCategory = "gitarrer";
    filterColor = undefined;
    filterName = undefined;
    filterPrice = undefined; 
    filterYear = undefined;
    filterModel = undefined;
    filterBrand = undefined;  
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
    e.preventDefault();
  });

  $('#pianoButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    filterCategory = "pianon";  
    filterColor = undefined;
    filterName = undefined;
    filterPrice = undefined; 
    filterYear = undefined;
    filterModel = undefined;
    filterBrand = undefined;
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
    e.preventDefault();
  });

  $('#drumButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    filterCategory = "trummor";  
    filterColor = undefined;
    filterName = undefined;
    filterPrice = undefined; 
    filterYear = undefined;
    filterModel = undefined;
    filterBrand = undefined;
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
    e.preventDefault();
  });

  $('#studioButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    filterCategory = "studio";
    filterColor = undefined;
    filterName = undefined;
    filterPrice = undefined; 
    filterYear = undefined;
    filterModel = undefined;
    filterBrand = undefined;
    alert(filterCategory + filterModel);
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
    e.preventDefault();
  });

  $('#yamahaTestButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    filterBrand = "Yamaha";
    filterCategory = "pianon";
    filterModel = "idk";
    filterColor, filterName, filterPrice, filterYear = undefined;
    alert(filterBrand + filterCategory + filterModel);
    showProdInfo("", filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear);
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

