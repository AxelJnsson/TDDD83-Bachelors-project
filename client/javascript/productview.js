let sortingKey = "null";
let newlyfilteredproducts = null;
let keyBoos = 
  {price: 0,
  name: 0,
  brand: 0,
  type: 0,
  color: 0
};

// Listening to sortingbuttons


function createProducts(filteringByArray,sortingKey){ 
  
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            //getInstruments(allinstruments);
      
         filtering(allinstruments,filteringByArray, sortingKey);
        },
        error: function(){
            alert("fel");
        }    
    });
}
    const lowerBoundPrice = []; 
    const higherBoundPrice = [];
    const numbersArray = [];


function filterPriceInterval(stuffToFilter, interval){
    
    var prInterval = interval;

    lowerBoundPrice.length = 0;
    higherBoundPrice.length = 0;


    for(var i = 0; i < prInterval.length ; i++) { 
            //alert(prInterval[0][0]);
            lowerBoundPrice.push(prInterval[i][0]);
            higherBoundPrice.push(prInterval[i][1]);
    }

    // alert(lowerBoundPrice[0]);
    // alert(higherBoundPrice[0]);

    numbersArray.length = 0;
    
    for(item in stuffToFilter){
            numbersArray.push(stuffToFilter[item].price);
    }

    //let matches = [];
    let nonMatches = [];
    
    numbersArray.forEach(num => {
    const matched = lowerBoundPrice.some((bound, i) => {
        return num > bound && num < higherBoundPrice[i];
    });

    matched ? filterprices.push(num) : nonMatches.push(num);
    });

    //  alert("Matchar: " + matches.length);
    //  alert("Ingen match: " + nonMatches.length);


}


//riktig filtrering
function filtering(arr, filterQueries, sortingKey){
    var filteredstuff = arr;
    const priceInterval = filterQueries[8];

    //alert(priceInterval.length);
     if (priceInterval !== 0){
         filterPriceInterval(filteredstuff, priceInterval); 
     }

    const types = filterQueries[0];
    const brands = filterQueries[1];
    const models = filterQueries[2];
    const colors = filterQueries[3];
    const prices = filterQueries[5];
    const years = filterQueries[6];
    const newornots = filterQueries[7];




    if (types.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            types.indexOf(el.type) >= 0);
    }

    if (brands.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            brands.indexOf(el.brand) >= 0);
    }
    
    if (models.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            models.indexOf(el.model) >= 0);
    }
    

    if (prices.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            prices.indexOf(el.price) >= 0);
    }


    if (colors.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            colors.indexOf(el.color) >= 0);
    }

    
    if (years.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            years.indexOf(el.year) >= 0);
    }

    //if (newornots.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            newornots.indexOf(el.new_or_not) >= 0);
    //}
    
    //alert("Antal produkter: " + filteredstuff.length);
    //getClickID(filteredstuff)
    
    
    //buggs??kning -----------
     //alert("Modeller: " + models.length + " Brands: " + brands.length + " Colors: " + colors.length + " ??r: " + years.length + " Nytt/beg: " + newornots.length + " Types: " + types.length);
     //----------------------
    
    
    newlyfilteredproducts = filteredstuff;
    //clickedSort();
    appendProducts(filteredstuff);
    sideBar(filteredstuff); 
    //return filteredstuff;
}

function getClickID() {
sortingProduct(newlyfilteredproducts,event.target.id)


console.log(event.target.id)
}
/*function getClickID(products){
  console.log("testar")
  var sortbuttons = document.getElementsByClassName('sort-by')
      for (i = 0; i < sortbuttons.length; i++) {
        if (document.addEventListener) {
        console.log("hej")
        console.log(sortbuttons[i])
        sortbuttons[i].addEventListener("click", myfunction(products));
        }
        else { 
          if (document.attachEvent) {
              sortbuttons[i].attachEvent("onclick", myfunction(products));
          }
    }
  }
}*/

/*function myfunction(products){
  console.log("Lyssnar");
  console.log(target.id)
  sortingProduct(products, target.id)
  
};
function clickedSort() {
  
}*/

function sortingProduct(filteredproducts, key){
if (key !== "null") {

//if (Object.keys(keyBoos).contains(key)) {
if (keyBoos.hasOwnProperty(key)){ 
  if (keyBoos["key"] == 0 ){
    keyBoos["key"] = 1
    console.log(keyBoos["key"])
  } else {
    keyBoos["key"] = 0
    console.log(keyBoos["key"])
  };

};


const objectkeysarray = Object.keys(filteredproducts[0])
console.log(objectkeysarray);
const sortedproducts = filteredproducts.sort(function(x,y) {
  if (keyBoos["key"] == 1) {
    let z;
    z = x;
    x = y
    y = z
  }
  if (key == "price") {
    
  return x[key] - y[key];
  }
  else {
    return x[key] == y[key] ? 0 : x[key] > y[key] ? 1 : -1;
  }

});
//console.log(sortedproducts)
appendProducts(sortedproducts);
}
appendProducts(filteredproducts);
}

function appendProducts(filteredproducts){
    $("#productViewContainer").html($("#empty").html())
    $("#productViewContainer").html($("#view-product").html())  
    var products = filteredproducts;
    let j = 0;
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    for (let i=0; i < products.length; i++) {
    //funktion f??r att skriva ut produkterna 4 och 4
        //if (i%4 == 0) {
            //j++;
            
        //} Tog bort, snyggare att dom l??gger sig r??tt beroende p?? sk??rmstorlek! <333 /Unn
        var beg;
        $("#testdiv").append("<div class='row' id='"+j+"'></div>");
        if (products[i].new_or_not == 0) {
            beg = "Begagnad";
        } else {
            beg = "Ny";
        }
       let q = 0
       if (productsInCart.has(products[i].product_id)){
           q = productsInCart.get(products[i].product_id);
       } 
    //    console.log(products[i].quantity-productsInCart.get(products[i].product_id));
       if ((products[i].quantity-q)<1){
        $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body' style='text-align: center'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>"+beg+"</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<div class ='row' style='margin-left: auto; margin-right: auto;'> <button class='btn btn-secondary btn-sm btnInfo' style='font-size:10px;' data-id='"+ i + "'>Visa info</button><button type='button' class='btn btn-red' style='font-size:10px; background-color: red;' data-dismiss='modal'onClick='outOfStockAlert()' value='"+products[i].product_id+"' id='addProductToCartButtonOut"+products[i].product_id+"'>Slut<span class='cart-item'></span></button></div></div></div>");
       }else{
        $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body' style='text-align: center'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>"+beg+"</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<div class ='row' id='buttonDivForProductView"+products[i].product_id+"' style='margin-left: auto; margin-right: auto;'> <button class='btn btn-secondary btn-sm btnInfo' style='font-size:10px;' data-id='"+ i + "'>Visa info</button><button type='button' class='btn btn-tonehub' style='font-size:10px;' data-dismiss='modal' onClick='doThings(this.value, this)' value='"+products[i].product_id+"' id='addProductToCartButton"+products[i].product_id+"'>K??p<span class='cart-item'></span></button></div></div></div>");
       }
 }

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        $(".product-modal-body").empty();
        $("#productModalFooter").empty();

        $("#productModal").modal('toggle');
        $(".product-modal-body").append("<div class='card-body' style='margin-right: auto; margin-left: auto; text-align: center;'><h5 class='card-title' style='font-weight: bold;'> " + products[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ products[prod_id].image +"'><br><p class='card-text'> <b>M??rke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>F??rg: </b>" + products[prod_id].color + "<br> <b>??r: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "</p></div>");
        $("#productModalFooter").append('<button type="button" class="btn btn-tonehub" data-dismiss="modal" onClick="doThings(this.value, this)" value="'+products[prod_id].product_id+'" id="addProductToCartButton">L??gg i varukorgen<span class="cart-item"></span></button>');
    });

    if (products.length <= 0){
        $("#productViewContainer").html($("#noProductView").html())    
    }
}

function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 
    showProdInfo();
}


function showProdInfo(filterQueries) {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>n??nting n??nting yamaha</p>");
    var filterQ = filterQueries;

   createProducts(filterQ);
   //alert(products[0].name);

   // filtering(products, filterQ);

    //return products;

}

var brandClicked = false;
var modelClicked = false;
var colorClicked = false;
var yearClicked = false;
var priceClicked = false;

function sideBar(products){

    let prod = products;

    const brands = [];
    const models = [];
    const colors = [];
    const years = [];

    const priceIntervals = [[0, 1000], [1000, 5000], [5000, 10000], [10000, 100000], [100000, 1000000000000000]]; //h??rdkodade s?? l??nge
   
    const all = [];

    for(var j = 0; j < prod.length; j++){
        brands.push(prod[j].brand);
        models.push(prod[j].model);
        colors.push(prod[j].color);
        years.push(prod[j].year);   
    }


    var uniqueBrands = brands.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueModels = models.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueColors = colors.filter((v, i, a) => a.indexOf(v) === i)
    var uniqueYears = years.filter((v, i, a) => a.indexOf(v) === i);

    uniqueBrands.sort();
    uniqueModels.sort();
    uniqueColors.sort();
    uniqueYears.sort();

    //debug
    //alert("Valbara m??rken: " + uniqueBrands.length + " Valbara modeller: " + uniqueModels.length + " Valbara f??rger: " + uniqueColors.length + " Valbara ??r: " + uniqueYears.length);


    if(brandClicked == false) {
        $("#brandArea").empty();
        for(var j = 0; j < uniqueBrands.length; j++){
            $("#brandArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='"+j+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " +  uniqueBrands[j] +  " </span></label></li>");           
        }
    }

    if(modelClicked == false){
        $("#modelArea").empty();
        for(var i = 0 ; i < uniqueModels.length; i++) {
            $("#modelArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somemodel' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " +  uniqueModels[i] +  " </span></label></li>");
        }
    }

    if(colorClicked == false){
        $("#colorArea").empty();
        for(var i = 0 ; i < uniqueColors.length; i++) {
            $("#colorArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somecolor' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " +  uniqueColors[i] +  " </span></label></li>");
        }
    }

    if(yearClicked == false) {
        $("#yearArea").empty();
        for(var i = 0 ; i < uniqueYears.length; i++) {
            $("#yearArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someyear' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " +  uniqueYears[i] +  " </span></label></li>");
        }
    }

    //alert("Brand clicked: " + brandClicked + " Model clicked: " + modelClicked + " Color clicked: " + colorClicked + " Year clicked: " + yearClicked);

    var outputInterval;

    if(priceClicked == false) {
        $("#priceArea").empty();
         for(var i = 0 ; i < priceIntervals.length; i++) {
            if(i == 0) {
                outputInterval = "0 - 1000";
            } else if(i == 1){
                outputInterval = "1000 - 5000";
            } else if(i == 2) {
                outputInterval = "5000 - 10 000";
            } else if (i == 3) {
                outputInterval = "10 000 - 100 000";
            } else {
                outputInterval = "??ver 100 000";
            }

            $("#priceArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someprice' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " +  outputInterval +  " </span></label></li>");
        }
    }

  $('.somebrand').on("click" ,function (e) {
    e.stopImmediatePropagation();
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") === true){
        filterbrands.push(uniqueBrands[checkBoxId]);
        //alert(filterbrands.length);
        brandClicked = true;
        //alert(brandClicked);

    } else if ($(this).prop("checked") === false) {
        if(filterbrands.length == 1) {
            //alert(filterbrands.length);
            brandClicked = false;
            filterbrands.length = 0;
            //alert(brandClicked);
        } else if (filterbrands.length > 1) {
            //alert("test");
            for(item in filterbrands) {
                if(filterbrands[item] == uniqueBrands[checkBoxId]){
                  filterbrands.splice(item,1);
                }
              }

        }
    }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())  
        showProdInfo(filterQ);
    
  });

  $('.somemodel').on("click" ,function (e) {
    e.stopImmediatePropagation();

    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filtermodels.push(uniqueModels[checkBoxId]);
        modelClicked = true;
    } else if ($(this).prop("checked") == false) {
        if(filtermodels.length == 1) {
            filtermodels.length = 0;
            modelClicked = false;
        } else if (filtermodels.length > 1) {
            //alert("test");
            for(item in filtermodels) {
                if(filtermodels[item] == uniqueModels[checkBoxId]){
                  filtermodels.splice(item,1);
                }
              }

        }
    }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        //alert(filterQ[2].length);  
        showProdInfo(filterQ);
    
  });

  $('.somecolor').on("click" ,function (e) {
    e.stopImmediatePropagation();

    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filtercolors.push(uniqueColors[checkBoxId]);
        colorClicked = true;
        //alert(filtercolors[0]);
    } else if ($(this).prop("checked") == false) {
        if(filtercolors.length == 1) {
            filtercolors.length = 0;
            colorClicked = false;
        } else if (filtercolors.length > 1) {
            //alert("test");
            for(item in filtercolors) {
                if(filtercolors[item] == uniqueColors[checkBoxId]){
                  filtercolors.splice(item,1);
                }
              }

        }
        
    }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())  
        showProdInfo(filterQ);
    
  });
    
  $('.someyear').on("click" ,function (e) {
    e.stopImmediatePropagation();

    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filteryears.push(uniqueYears[checkBoxId]);
        yearClicked = true;
        //alert(filteryears[0]);
    } else if ($(this).prop("checked") == false) {
        if(filteryears.length == 1) {
            filteryears.length = 0;
            yearClicked = false;
        } else if (filteryears.length > 1) {
            //alert("test");
            for(item in filteryears) {
                if(filteryears[item] == uniqueYears[checkBoxId]){
                  filteryears.splice(item,1);
                }
              }

        }
        
    }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())  
        showProdInfo(filterQ);
    
  });

  $('.someprice').on("click" ,function (e) {
    e.stopImmediatePropagation();
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filterpriceinterval.push(priceIntervals[checkBoxId]);
        
        priceClicked = true;
        //alert(filteryears[0]);
    } else if ($(this).prop("checked") == false) {
        if(filterpriceinterval.length == 1) {
            filterpriceinterval.length = 0;
            priceClicked = false;
        } else if (filterpriceinterval.length > 1) {
            //alert("test");
            for(item in filterpriceinterval) {
                if(filterpriceinterval[item] == priceIntervals[checkBoxId]){
                  filterpriceinterval.splice(item,1);
                }
              }

        }
        filterprices.length = 0;

    }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())  
        showProdInfo(filterQ);
    
  });
    
    
}

$('#closeProductModal').on("click" ,function (e) {
    $(".product-modal-body").empty();
    $("#productModal").modal('hide');
    $('#productModal').data('bs.modal',null);  
    e.preventDefault();
});

$('#xProduct').on("click" ,function (e) {
    $(".product-modal-body").empty();
    $("#productModal").modal('hide'); 
    $('#productModal').data('bs.modal',null);  
    e.preventDefault();
});


//F??r att visa "tillagd" n??r en produkt l??ggs i varukorgen
function doThings(value, btn){
    addProductToCart(value);
    btn.textContent ='Tillagd';
    setTimeout(function() { setBack(btn); }, 3000);
    updateItemNumber();
}
  
//??ndrar siffran bredvid varukorgen n??r en produkt l??ggs i varukorgen
function doThings3(a) {
    var newCartTotal = parseInt(a);
    $('#basketArea').empty();

    if (newCartTotal < 10) {
        $("#basketArea").append("<span class='badge badge-primary' style='height: 20px; width: 20px; margin-right: 10px; margin-left: 5px; text-align: center; background-color: rgb(196, 215, 240) !important; color: black;'>" + newCartTotal + "</span>");
    } else {
        $("#basketArea").append("<span class='badge badge-primary' style='height: 20px; width: 30px; margin-right: 10px; margin-left: 5px; text-align: center; background-color: rgb(196, 215, 240) !important; color: black;'>" + newCartTotal + "</span>"); 
    }
}
  
//??ndrar tillbaka knappen fr??n "tillagd" till "k??p"
function setBack(btnn) {
    btnn.textContent ='K??p';
}


function outOfStockAlert(){
    alert("Produkten ??r f??r tillf??llet slut i lager!")
}