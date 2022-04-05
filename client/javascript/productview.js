//funkar inte än att hämta in klasser från productclasses.js så lägger den här så länge 
/* 
class Product {
    constructor(id, category, brand, model, name, price, color, year, condition, image, otherinfo){
        this.id = id;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.price = price;
        this.color = color;
        this.year = year;
        this.condition = condition;
        this.image = image;
        this.otherinfo = otherinfo;     

    }
}
*/
//testfunktion med hårdkodade testprodukter (att fungera som "databas" så länge)
//function createProducts(filterQueries){

function createProducts(filteringByArrayTest){ 
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            //getInstruments(allinstruments);
            //sideBar(allinstruments); 
            filtertest2(allinstruments, filteringByArrayTest);
        },
        error: function(){
            alert("fel");
        }    
    });
}

function createCategoriesForSidebar(){ 
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            //getInstruments(allinstruments);
            sideBar(allinstruments); 
            //filtertest2(allinstruments, filteringByArrayTest);
        },
        error: function(){
            alert("fel");
        }    
    });
}


function getInstruments(allinstruments){
    var arr = allinstruments;
    alert(arr[0].name);
    return arr;
}

//riktig filtrering
function filtertest2(arr, testingArrayFilters){
    const types = testingArrayFilters[0];
    const brands = testingArrayFilters[1];
    const models = testingArrayFilters[2];
    const colors = testingArrayFilters[3];
    const names = testingArrayFilters[4];
    const prices = testingArrayFilters[5];
    const years = testingArrayFilters[6];
    const newornots = testingArrayFilters[7];
   
    var filteredstuff = arr;

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
    
    if (names.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            names.indexOf(el.name) >= 0);
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
    //return filteredstuff;
}

function appendProducts(filteredproducts){

    var products = filteredproducts;
    let j = 0;
    for (let i=0; i < products.length; i++) {
    //funktion för att skriva ut produkterna 4 och 4
        if (i%4 == 0) {
            j++;
            
        }
        $("#testdiv").append("<div class='row' id='"+j+"'></div>");

        if (products[i].new_or_not == 0) {
            $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Begagnad</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");
        } else if (products[i].new_or_not == 1) {
            $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>Ny</p><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");
        }
}

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        $(".product-modal-body").empty();
        $("#productModalFooter").empty();

        $("#productModal").modal('toggle');
        $(".product-modal-body").append("<div class='card'><div class='card-body'><h5 class='card-title'> " + products[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ products[prod_id].image +"'><br><p class='card-text'> <b>Märke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>Färg: </b>" + products[prod_id].color + "<br> <b>År: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "</p></div></div>");
        $("#productModalFooter").append('<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="addProductToCart(this.value)" value="'+products[prod_id].product_id+'" id="addProductToCartButton">Lägg i varukorgen</button>');
    });
    //sideBar(products);
}
   
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

   //filtertest2(products, filterQ);

    //return products;

}

function sideBar(products){
    $("#brandArea").empty();
    let prod = products;

    const brands = [];
    const models = [];
    const colors = [];
    const years = [];
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

    all.push(uniqueBrands);
    all.push(uniqueModels);
    all.push(uniqueColors);
    all.push(uniqueYears);

    //alert(all.length);

    // for (var i = 0; i < all.length ; i++) {
    //     $("#sideMenu").append("<li><a class='nav-link px-0' href='#submenu1' data-bs-toggle='collapse' aria-expanded='false'aria-controls='submenu1'><span class='text-secondary'>'Märken eller något'</span></a><ul class='collapse nav flex-column' id='area"+i+"'>");

    //     for(var j = 0; j < all[i].length; j++){
    //         alert(all[i][j]);
    //         $("#area"+i).append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='"+j+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  all[i][j] +  " </span></label></li>");
          
    //     }
    // }

    for(var j = 0; j < uniqueBrands.length; j++){
        $("#brandArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='"+j+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  uniqueBrands[j] +  " </span></label></li>");           
    }

    for(var i = 0 ; i < uniqueModels.length; i++) {
        $("#modelArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somemodel' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  uniqueModels[i] +  " </span></label></li>");
    }

    for(var i = 0 ; i < uniqueColors.length; i++) {
        $("#colorArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somecolor' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  uniqueColors[i] +  " </span></label></li>");
    }

    for(var i = 0 ; i < uniqueYears.length; i++) {
        $("#yearArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someyear' type='checkbox' value='' data-id='"+i+"'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  uniqueYears[i] +  " </span></label></li>");
    }

  $('.somebrand').on("click" ,function (e) {
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filterbrands.push(uniqueBrands[checkBoxId]);
    } else if ($(this).prop("checked") == false) {
        if(filterbrands.length == 1) {
            filterbrands.length = 0;
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
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filtermodels.push(uniqueModels[checkBoxId]);
    } else if ($(this).prop("checked") == false) {
        if(filtermodels.length == 1) {
            filtermodels.length = 0;
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
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filtercolors.push(uniqueColors[checkBoxId]);
        alert(filtercolors[0]);
    } else if ($(this).prop("checked") == false) {
        if(filtercolors.length == 1) {
            filtercolors.length = 0;
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
    var checkBoxId = $(this).data('id');
    if($(this).prop("checked") == true){
        filteryears.push(uniqueYears[checkBoxId]);
        alert(filteryears[0]);
    } else if ($(this).prop("checked") == false) {
        if(filteryears.length == 1) {
            filteryears.length = 0;
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
    
    
}
function filterBox(){
    //alert("h");
    var checkBoxId = $(this).data('id');
    alert(checkBoxId);
    var checkBox = document.getElementById(checkBoxId);
    alert("hitttt");
    if(checkBox.checked == true) {
        alert("hit");

    }
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
