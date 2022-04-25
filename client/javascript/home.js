$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $("#mainViewContainer").html($("#view-homeSlide").html())
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html())
    document.getElementById('top').scrollIntoView();
    showSlides();
    createProducts2();
    var signedIn;
    if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
      signedIn = true;
      console.log("inloggad " + signedIn);
    } else {
      signedIn = false;
      var admin;
      if (JSON.parse(sessionStorage.getItem('auth')).user.is_admin === 1) {
        admin = true;
      } else {
        admin = false;
      console.log("inloggad" + signedIn);
    }
  }

    
    $('#registerButton').toggleClass('d-none', !signedIn);
    $('#loginButton').toggleClass('d-none', !signedIn);
    $('#logoutButton').toggleClass('d-none', signedIn);
    $('#annonsButton').toggleClass('d-none', signedIn);
    $('#userButton').toggleClass('d-none', signedIn);
    $('#adminButton').toggleClass('d-none', !admin);
    sessionStorage.setItem('price', parseInt(0));  
           
    if (JSON.parse(sessionStorage.getItem('auth'))==null){
      sessionStorage.setItem('loggedIn',false);
    }else{
      sessionStorage.setItem('loggedIn',true);
    }
    if (JSON.parse(sessionStorage.getItem('startedShopping'))==null){
      idAndQuantity = {}
      productsOutOfStock = [];
      sessionStorage.setItem('productsInCart',JSON.stringify(Array.from(idAndQuantity)));
      sessionStorage.setItem('outOfStock', JSON.stringify(productsOutOfStock));
      sessionStorage.setItem('startedShopping',true);
    }

    updateItemNumber();
    setFilterQueries(filteringByArray);

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
 const filterpriceinterval = [];
 let filterQ = [filtertypes, filterbrands, filtermodels, filtercolors, filternames, filterprices, filteryears, filternewornot, filterpriceinterval];
 //const filterQueries = {category: filterCategory, brand: filterBrand, model: filterModel, color: filterColor, name: filterName, price: filterPrice, year: filterYear};

$('#aboutButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-about").html())  
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html()) 
    e.preventDefault();
  });

//används bara tillfälligt
  $('#stripeButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-stripe").html())  
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html()) 

    
    e.preventDefault();
  });



  $('#annonsButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-createAdd").html())
    fillOptions1();
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html())
     e.preventDefault();
   });

   $('#adminButton').click(function (e) {      
    $("#mainViewContainer").html($("#view-adminPage").html())
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html())
    Display_admin();
     e.preventDefault();
   });

    
function openRegModal(){
  $("#registerModal").modal('toggle');
  e.preventDefault();
}
function snapchatImage(){
  $("#snapchatModal").modal('toggle');
  e.preventDefault();
}
function instaImage(){
  $("#instaModal").modal('toggle');
  e.preventDefault();
}

$('#xButtonSnap').click(function (e) {
  e.preventDefault();
  $("#snapchatModal").modal('hide');
});
$('#xeditUserModal').click(function (e) {
  e.preventDefault();
  $("#editUserModal").modal('hide');
});

function faqView() {
  $("#mainViewContainer").html($("#view-FAQ").html())
  $("#sideBarContainer").html($("#empty").html())
  $("#productViewContainer").html($("#empty").html())
  document.getElementById('top').scrollIntoView();
  e.preventDefault();
}  
$('#contactButton').click(function (e) {          
    e.preventDefault();
  });
//används ej tror jag
  function startshopp() {
    $("#mainViewContainer").html($("#view-product").html())
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html())  
    //showProdInfo("allt", null);
    resetFilter();
    //filternewornot.push("Ny", "Begagnad");
    showProdInfo(filterQ);
    e.preventDefault();

  }
 
  function myPage() {
    $("#mainViewContainer").html($("#view-user").html())
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html()) 
    document.getElementById('top').scrollIntoView();
    displayUser();  
    getNewProducts();  
    e.preventDefault();

  }
  $('#userButton').click(function (e) {   
    
    $("#mainViewContainer").html($("#view-user").html())
    $("#sideBarContainer").html($("#empty").html())
    $("#productViewContainer").html($("#empty").html())    
    displayUser();  
    nextorder = null;
    displayUserAdd(); 
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
      filterpriceinterval.length = 0;
      yearClicked = false;
      modelClicked = false;
      brandClicked = false;
      colorClicked = false;
      priceClicked = false;
      //filternewornot.length = 0;
  }

 function buyInstruments(){
  $("#sideBarContainer").html($("#view-sidebar").html())
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())


    //showProdInfo("allt", null);
    resetFilter();
    //filternewornot.push("Ny", "Begagnad");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
 }

  $('#allInstrButton').click(function (e) {
    $("#sideBarContainer").html($("#view-sidebar").html())
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())

    //showProdInfo("allt", null);
    resetFilter();
    //filternewornot.push("Ny", "Begagnad");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  });

  /*function gitarrView(){
      $("#sideBarContainer").html($("#view-sidebar").html())  
      $("#productViewContainer").html($("#view-product").html())
      $("#mainViewContainer").html($("#empty").html())
   };*/
   function showAllInst(){
    $("#sideBarContainer").html($("#view-sidebar").html())
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    resetFilter();
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  }
   function gitarrView(){  
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    
    resetFilter();
    var defCategory = "Gitarr";
    filtertypes.push(defCategory);
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };
  function basView(){  
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    
    resetFilter();
    var defCategory = "Bas";
    filtertypes.push(defCategory);
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };

  function pianoView(){  
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html()) 
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Piano");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };
  function keyboardView(){  
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html()) 
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Keyboard");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };
  
  function kAndPView(){
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Piano");
    filtertypes.push("Keyboard");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };

  function drumView(){
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Trummor");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };
  function otherDrumView(){
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Speciella Trummor");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };
  function allDrumsView(){
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Trummor");
    filtertypes.push("Other");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();
    e.preventDefault();
  };


  function studioView(){
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    document.getElementById('navbarNav2').scrollIntoView();
    resetFilter();
    filtertypes.push("Studio");
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();

    e.preventDefault();
  };

  $('#alphornButton').click(function (e) {  
    //alert(filtertypes.length);
 
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    resetFilter();
    var testcategory1 = "Blås";
    
    filtertypes.push(testcategory1);
    filternewornot.length = 0;
    filternewornot.push(0, 1); 
    showProdInfo(filterQ);
    createCategoriesForSidebar();

    e.preventDefault();
  });

  // $('#resetFilterBtn').click(function (e) {  
  //   alert("hej");
  //   resetFilter();
  //   $("#sideBarContainer").html($("#view-sidebar").html())  
  //   $("#productViewContainer").html($("#view-product").html())
  //   $("#mainViewContainer").html($("#empty").html())
  //   showProdInfo(filterQ);
  //  });

  function btnResetFilter(){
    resetFilter();
    $("#sideBarContainer").html($("#view-sidebar").html())  
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    showProdInfo(filterQ);
    createCategoriesForSidebar();
   }

$('#homeButton').click(function (e) {
  $("#mainViewContainer").html($("#view-homeSlide").html()) 
  $("#sideBarContainer").html($("#empty").html())
  $("#productViewContainer").html($("#empty").html())
  showSlides();
  createProducts2();
    e.preventDefault();
});

function showView(view){
  $("#mainViewContainer").html($(view).html())
  $("#sideBarContainer").html($("#empty").html())
  $("#productViewContainer").html($("#empty").html())
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
  //alert(filterQ[7][0] + filterQ[7][1])
  
  $("#productViewContainer").html($("#empty").html())
  $("#productViewContainer").html($("#view-product").html())
  showProdInfo(filterQ);
}

function regOrAnnons() {
  if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
 
    $("#loginModal").modal('toggle');
  } else {
    $("#mainViewContainer").html($("#view-createAdd").html())
  } 
}

function SucPay(u) {
  
  $("#mainViewContainer").html($("#lyckad-betalning").html())
  alert("din betalning gick igenom");
  addOrdersAndItemsToHistory();
  //Gör nåt som uppdaterar varukorgen och skapar en

  $("#lyckadBet").attr("href", u)

 
 
 
 
}

