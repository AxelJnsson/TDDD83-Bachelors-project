$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-home").html())
   
    filternewornot.push(0, 1);  
    var signedIn;
    if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
      signedIn = true;
    } else {
      signedIn = false;
    }
    
    $('#registerButton').toggleClass('d-none', !signedIn);
    $('#loginButton').toggleClass('d-none', !signedIn);
    $('#logoutButton').toggleClass('d-none', signedIn);
    $('#annonsButton').toggleClass('d-none', signedIn);
    $('#userButton').toggleClass('d-none', signedIn);
    
 })
 
 //var filterCategory, filterBrand, filterModel, filterColor, filterName, filterPrice, filterYear;
 //test för en till dimension av filtrering
 const filtertypes = [];
 const filterbrands = [];
 const filtermodels = [];
 const filtercolors = [];
 const filternames = [];
 const filterprices = [];
 const filteryears = [];
 const filternewornot = [];
 let filterQ = [filtertypes, filterbrands, filtermodels, filtercolors, filternames, filterprices, filteryears, filternewornot];
 //const filterQueries = {category: filterCategory, brand: filterBrand, model: filterModel, color: filterColor, name: filterName, price: filterPrice, year: filterYear};

$('#aboutButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-about").html())   
    e.preventDefault();
  });


  $('#annonsButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-createAdd").html())
     e.preventDefault();
   });

function faqView() {
  $("#mainViewContainer").html($("#view-FAQ").html())
  e.preventDefault();
}  
$('#contactButton').click(function (e) {          
    e.preventDefault();
  });

  function startshopp() {
    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);
    resetFilter();
    //filternewornot.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();

  }

  $('#userButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-user").html()) 
    displayUser();  
    getNewProducts();  
    e.preventDefault();
  });

  function resetFilter(){
      filtertypes.length = 0;
      filterbrands.length = 0;
      filtermodels.length = 0;
      filtercolors.length = 0;
      filternames.length = 0;
      filterprices.length = 0;
      filteryears.length = 0;
      //filternewornot.length = 0;
  }

  $('#allInstrButton').click(function (e) {   

    $("#mainViewContainer").html($("#view-product").html())  
    //showProdInfo("allt", null);

    resetFilter();
    //filternewornot.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#guitarButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    var defCategory = "gitarr";
    filtertypes.push(defCategory);
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#pianoButton').click(function (e) { 
    $("#mainViewContainer").html($("#view-product").html())  
    resetFilter();
    filtertypes.push("piano");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#drumButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    filtertypes.push("trummor");

    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#studioButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())  
    resetFilter();
    filtertypes.push("studio");
    showProdInfo(filterQ);
    e.preventDefault();
  });

  $('#yamahaTestButton').click(function (e) {   
    $("#mainViewContainer").html($("#view-product").html())
    resetFilter();
    var testcategory1 = "gitarr";
    var testcategory2 = "piano";
    //var testcategory3 = "trummor";

    var testbrand1 = "Yamaha";
    //var testmodell = "idk";
    filtertypes.push(testcategory1, testcategory2);
    filterbrands.push(testbrand1);
    //filtermodels.push(testmodell);
    // alert(filtertypes[0] + filtertypes[1]);
    // alert(filterQ[0][1]);
    alert("Gitarrer och pianon av märke yamaha");
    showProdInfo(filterQ);
    e.preventDefault();
  });

$('#homeButton').click(function (e) {
  $("#mainViewContainer").html($("#view-home").html())  
    e.preventDefault();
});

function showView(view){
  $("#mainViewContainer").html($(view).html())
}
//testfunktion för filtrering
function checkNeworOldStuff(checkid, query){
  var checkBox = document.getElementById(checkid);

  if (checkBox.checked == true) {
    if (filternewornot.length !== 0)
    {
      for(item in filternewornot) {
        if(filternewornot[item] !== query)
        filternewornot.push(query);
      }
    } else {
      filternewornot.push(query);
    }
    
  } else {
    if(filternewornot.length !== 1) {
      for(item in filternewornot) {
        if(filternewornot[item] == query){
          filternewornot.splice(item,1);
        }
      }
    } else {
      filternewornot.length = 0;
    }
   
    
  }
  alert(filterQ[7][0] + filterQ[7][1])
  $("#mainViewContainer").html($("#view-product").html())  

  showProdInfo(filterQ);
}

function regOrAnnons() {
  if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
 
    $("#loginModal").modal('toggle');
  } else {
    $("#mainViewContainer").html($("#view-createAdd").html())
  }

 
}



