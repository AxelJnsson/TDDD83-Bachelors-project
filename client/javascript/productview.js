function createProducts(filteringByArray){ 
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            //getInstruments(allinstruments);
         filtering(allinstruments,filteringByArray);
        },
        error: function(){
            alert("fel");
        }    
    });
}

function filterPriceInterval(stuffToFilter, interval){
    
    var prInterval = interval;

    const lowerBoundPrice = []; 
    const higherBoundPrice = [];

    //alert(prInterval.length);

    for(var i = 0; i < prInterval.length ; i++) {
       
            //alert(prInterval[0][0]);
            lowerBoundPrice.push(prInterval[i][0]);
            higherBoundPrice.push(prInterval[i][1]);
        
       
    }
       


    const numbersArray = [];
    
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
function filtering(arr, filterQueries){
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
    const names = filterQueries[4];
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
    
    appendProducts(filteredstuff);
    sideBar(filteredstuff); 
    //return filteredstuff;
}

function appendProducts(filteredproducts){
    $("#productViewContainer").html($("#empty").html())
    $("#productViewContainer").html($("#view-product").html())  
    var products = filteredproducts;
    let j = 0;
    for (let i=0; i < products.length; i++) {
    //funktion för att skriva ut produkterna 4 och 4
        //if (i%4 == 0) {
            //j++;
            
        //} Tog bort, snyggare att dom lägger sig rätt beroende på skärmstorlek! <333 /Unn
        var beg;
        $("#testdiv").append("<div class='row' id='"+j+"'></div>");
        if (products[i].new_or_not == 0) {
            beg = "Begagnad";
        } else {
            beg = "Ny";
        }
       
       // if (products[i].new_or_not == 0) {
           // $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Begagnad</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<button class='btn btn-primary btn-sm btnInfo' style='font-size:10px' data-id='"+ i + "'>Visa info</button><button type='button' class='btn btn-primary' style='font-size:10px; float:left;' data-dismiss='modal' onClick='addProductToCart(this.value)' value='"+products[i].product_id+"' id='addProductToCartButton'>Lägg i varukorgen</button></div></div>");
            //<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="addProductToCart(this.value)" value="'+products[i].product_id+'" id="addProductToCartButton">Lägg i varukorgen</button>
           // $("#"+j).append(html);
       // } else if (products[i].new_or_not == 1) {
         //   $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Ny</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></div>" + "<button class='btn btn-primary btn-sm btnInfo' style='font-size:10px' data-id='"+ i + "'>Visa info</button></div></div>");
       // }
       $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>"+beg+"</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<div class ='row'> <button class='btn col-6 btn-primary btn-sm btnInfo' style='font-size:10px;' data-id='"+ i + "'>Visa info</button><button type='button' class='btn btn-primary' style='font-size:10px;' data-dismiss='modal' onClick='addProductToCart(this.value)' value='"+products[i].product_id+"' id='addProductToCartButton'>Köp</button></div></div></div>");
 
//....
        //var condition;

        //if(products[i].new_or_not == 0) {
          //  condition = "Begagnad";
        //} else {
          //  condition = "Ny"
        //}

        //$("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br>Skick: "+ condition +" </h5><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"<br> <b>Märke:</b> " + products[i].brand + "<br> <b>Modell:</b> " + products[i].model + "</p> <b><h4>" + products[i].price + "</h4></div>" + "<button class='btn btn-primary btn-sm btnInfo' style='font-size:20px' data-id='"+ i + "'>Visa Info</button></div></div>");
    }

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        $(".product-modal-body").empty();
        $("#productModalFooter").empty();

        $("#productModal").modal('toggle');
        $(".product-modal-body").append("<div class='card'><div class='card-body'><h5 class='card-title'> " + products[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ products[prod_id].image +"'><br><p class='card-text'> <b>Märke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>Färg: </b>" + products[prod_id].color + "<br> <b>År: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "</p></div></div>");
        $("#productModalFooter").append('<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="addProductToCart(this.value)" value="'+products[prod_id].product_id+'" id="addProductToCartButton">Lägg i varukorgen</button>');
    });
    if (products.length <= 0){
        alert("hej");
        $("#productViewContainer").html($("#noProductView").html())    
    }
    //sideBar(products);
}

// function appendProducts(filteredproducts){

//     var products = filteredproducts;
//     let j = 0;
//     for (let i=0; i < products.length; i++) {
//     //funktion för att skriva ut produkterna 4 och 4
//         if (i%4 == 0) {
//             j++;
            
//         }
//         $("#testdiv").append("<div class='row' id='"+j+"'></div>");

//         if (products[i].new_or_not == 0) {
//             $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Begagnad</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");
//         } else if (products[i].new_or_not == 1) {
//             $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Ny</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");
//         }
// }

   
// return arr1;

function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 
    showProdInfo();
}


function showProdInfo(filterQueries) {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>");
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

    const priceIntervals = [[0, 1000], [1000, 5000], [5000, 10000], [10000, 100000]];
   
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

    // all.push(uniqueBrands);
    // all.push(uniqueModels);
    // all.push(uniqueColors);
    // all.push(uniqueYears);

    

    //alert(all.length);

    // for (var i = 0; i < all.length ; i++) {
    //     $("#sideMenu").append("<li><a class='nav-link px-0' href='#submenu1' data-bs-toggle='collapse' aria-expanded='false'aria-controls='submenu1'><span class='text-secondary'>'Märken eller något'</span></a><ul class='collapse nav flex-column' id='area"+i+"'>");

    //     for(var j = 0; j < all[i].length; j++){
    //         alert(all[i][j]);
    //         $("#area"+i).append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='"+j+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  all[i][j] +  " </span></label></li>");
          
    //     }
    // }

    if(brandClicked == false) {
        $("#brandArea").empty();
        for(var j = 0; j < uniqueBrands.length; j++){
            $("#brandArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='"+j+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright'> " +  uniqueBrands[j] +  " </span></label></li>");           
        }
    }

    if(modelClicked == false){
        $("#modelArea").empty();
        for(var i = 0 ; i < uniqueModels.length; i++) {
            $("#modelArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somemodel' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright'> " +  uniqueModels[i] +  " </span></label></li>");
        }
    }

    if(colorClicked == false){
        $("#colorArea").empty();
        for(var i = 0 ; i < uniqueColors.length; i++) {
            $("#colorArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somecolor' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright'> " +  uniqueColors[i] +  " </span></label></li>");
        }
    }

    if(yearClicked == false) {
        $("#yearArea").empty();
        for(var i = 0 ; i < uniqueYears.length; i++) {
            $("#yearArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someyear' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright'> " +  uniqueYears[i] +  " </span></label></li>");
        }
    }

    if(priceClicked == false) {
        $("#priceArea").empty();
        for(var i = 0 ; i < priceIntervals.length; i++) {
            $("#priceArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someprice' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-justright'> " +  priceIntervals[i] +  " </span></label></li>");
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
    alert("Filtrering på pris funkar, men är inte helt färdigt än!")
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
