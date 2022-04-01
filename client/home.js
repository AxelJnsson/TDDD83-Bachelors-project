$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())
   
    filterconditions.push("Ny", "Begagnad");  
    var signedIn;
    if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
      signedIn = true;
    } else {
      signedIn = false;
    }
    
    $('#registerButton').toggleClass('d-none', !signedIn);
    $('#loginButton').toggleClass('d-none', !signedIn);
    $('#logoutButton').toggleClass('d-none', signedIn);
    $('#userButton').toggleClass('d-none', signedIn);
    
 })

 //var filterCategory, filterBrand, filterModel, filterColor, filterName, filterPrice, filterYear;
 //test för en till dimension av filtrering
 const filtercategories = [];
 const filterbrands = [];
 const filtermodels = [];
 const filtercolors = [];
 const filternames = [];
 const filterprices = [];
 const filteryears = [];
 const filterconditions = [];
 let filterQ = [filtercategories, filterbrands, filtermodels, filtercolors, filternames, filterprices, filteryears, filterconditions];
 //const filterQueries = {category: filterCategory, brand: filterBrand, model: filterModel, color: filterColor, name: filterName, price: filterPrice, year: filterYear};

$('#aboutButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-about").html())    
    e.preventDefault();
  
  });

  $('#homeButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-home").html())
     e.preventDefault();
   });

$('#contactButton').click(function (e) {          
    e.preventDefault();
  });

  function startshopp() {
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    resetFilter();
    //filterconditions.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();

  }
/*$('#startShopping').click(function (e) {      
  $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    resetFilter();
    //filterconditions.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();
  });*/



  $('#userButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-user").html()) 
    displayUser();  
    getNewProducts();  
    e.preventDefault();
  });

  function resetFilter(){
      filtercategories.length = 0;
      filterbrands.length = 0;
      filtermodels.length = 0;
      filtercolors.length = 0;
      filternames.length = 0;
      filterprices.length = 0;
      filteryears.length = 0;
      //filterconditions.length = 0;
  }

  $('#allInstrButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    resetFilter();
    //filterconditions.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#guitarButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    var defCategory = "gitarrer";
    filtercategories.push(defCategory);
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#pianoButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    resetFilter();
    filtercategories.push("pianon");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#drumButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    filtercategories.push("trummor");

    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#studioButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    resetFilter();
    filtercategories.push("studio");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#yamahaTestButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    var testcategory1 = "gitarrer";
    var testcategory2 = "pianon";
    //var testcategory3 = "trummor";

    var testbrand1 = "Yamaha";
    //var testmodell = "idk";
    filtercategories.push(testcategory1, testcategory2);
    filterbrands.push(testbrand1);
    //filtermodels.push(testmodell);
    // alert(filtercategories[0] + filtercategories[1]);
    // alert(filterQ[0][1]);
    alert("Gitarrer och pianon av märke yamaha");
    showProdInfo(filterQ);
    e.preventDefault();
  });

$('#homeButton').click(function (e) {
  $("#mainViewContainer").html($("#view-home").html())  
    e.preventDefault();
});


//testfunktion för filtrering
function checkNeworOldStuff(checkid, query){
  var checkBox = document.getElementById(checkid);

  if (checkBox.checked == true) {
    if (filterconditions.length !== 0)
    {
      for(item in filterconditions) {
        if(filterconditions[item] !== query)
        filterconditions.push(query);
      }
    } else {
      filterconditions.push(query);
    }
    
  } else {
    if(filterconditions.length !== 1) {
      for(item in filterconditions) {
        if(filterconditions[item] == query){
          filterconditions.splice(item,1);
        }
      }
    } else {
      filterconditions.length = 0;
    }
   
    
  }
  alert(filterQ[7][0] + filterQ[7][1])
  $("#mainViewContainer").html($("#view-product").html())  

  showProdInfo(filterQ);
}



