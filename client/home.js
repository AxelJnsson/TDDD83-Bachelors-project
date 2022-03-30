$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())  
 })

 var filterCategory, filterBrand, filterModel, filterColor, filterName, filterPrice, filterYear;
 //test för en till dimension av filtrering
 const filtercategories = [];
 const filterbrands = [];
 const filtermodels = [];
 const filtercolors = [];
 const filternames = [];
 const filterprices = [];
 const filteryears = [];
 let filterQ = [filtercategories, filterbrands, filtermodels, filtercolors, filternames, filterprices, filteryears];
 const filterQueries = {category: filterCategory, brand: filterBrand, model: filterModel, color: filterColor, name: filterName, price: filterPrice, year: filterYear};

$('#aboutButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-about").html())    
    e.preventDefault();
  });

  $('#userButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-about").html())     
    e.preventDefault();
  });


  $('#allInstrButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    for(item in filterQueries)   {
      filterQueries[item] = undefined;
     // alert(item);
    }
    alert(filterQueries.category); //test, ska stå undefined
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
    //filterQueries.brand = "Yamaha"; //test
    //filterQueries.category = "pianon"; //test
    filterQueries.model = "idk"; //test
    var testcategory1 = "gitarrer";
    var testcategory2 = "pianon";
    var testbrand1 = "Yamaha";
    var testmodell = "idk";
    filtercategories.push(testcategory1, testcategory2);
    filterbrands.push(testbrand1);
    filtermodels.push(testmodell);
    // alert(filtercategories[0] + filtercategories[1]);
    // alert(filterQ[0][1]);
    showProdInfo(filterQ);
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

