$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())  
 })

 var filterCategory, filterBrand, filterModel, filterColor, filterName, filterPrice, filterYear;
 const filterQueries = {category: filterCategory, brand: filterBrand, model: filterModel, color: filterColor, name: filterName, price: filterPrice, year: filterYear};

$('#aboutButton').click(function (e) {
   
   
    $("#mainViewContainer").html($("#view-about").html())  
   
    e.preventDefault();
  });

  $('#allInstrButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    alert("hej");
    for(item in filterQueries)   {
      item = undefined;
      alert(item);
    }
    showProdInfo(filterQueries);
    e.preventDefault();
  });

  $('#guitarButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
    }
    filterQueries.category = "gitarrer"; 
    showProdInfo(filterQueries);
    e.preventDefault();
  });

  $('#pianoButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
    }
    filterQueries.category = "pianon";
    showProdInfo(filterQueries);
    e.preventDefault();
  });

  $('#drumButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
    }    
    filterQueries.category = "trummor";

    showProdInfo(filterQueries);
    e.preventDefault();
  });

  $('#studioButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
    }    
    filterQueries.category = "studio";
    showProdInfo(filterQueries);
    e.preventDefault();
  });

  $('#yamahaTestButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
    }      
    filterQueries.brand = "Yamaha";
    filterQueries.category = "pianon";
    filterQueries.model = "idk";
    showProdInfo(filterQueries);
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

