//funkar inte än att hämta in klasser från productclasses.js så lägger den här så länge  
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

//testfunktion med hårdkodade testprodukter (att fungera som "databas" så länge)
//function createProducts(filterQueries){

function createProducts(filteringByArrayTest){
  
    $.ajax({  
        headers: {
            "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},       
        url:'/product',
        type: 'GET',
        success: function(u) {            
            var allinstruments = u; 
            return filtertest2(allinstruments, filteringByArrayTest);
        /*alert(produkt[1].name);*/
        },
        error: function(){
            alert("fel");
        }
    });
}

//gammal filtreringsfunktion, låter ligga kvar så länge
function filtertest(arr, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear){
    var filterprod = {category: inputCategory, brand: inputBrand, model: inputModel, name: inputName, price: inputPrice, color : inputColor, year : inputYear}; 
        var arr1 = arr.filter(function(item) {
                 for (var key in filterprod) {
                    // alert("hej");
                       if (item[key] != filterprod[key] && filterprod[key] !== undefined) 
                            return false;                    
                 }
                    return true;
       });     

      alert("Antal produkter: " + arr1.length); //antal produkter, för test
       return arr1;
}

//riktig filtrering
function filtertest2(arr, testingArrayFilters){
    const types = testingArrayFilters[0];
    //alert(types[0] + types[1]);
    const brands = testingArrayFilters[1];
    const models = testingArrayFilters[2];
    const names = testingArrayFilters[3];
    const prices = testingArrayFilters[4];
    const colors = testingArrayFilters[5];
    const years = testingArrayFilters[6];
    const newornots = testingArrayFilters[7];
   
    var filteredstuff = arr;

    //  for (var i = 0; i < testingArrayFilters.length; i++) {
    //      for (item in arr) {
    //         var current = testingArrayFilters[i];
    //         item++;
    //         //alert(item);
    //         if(testingArrayFilters[i].length !== 0) {
    //             filteredstuff = filteredstuff.filter( el => 
    //             current.indexOf(el.item) >= 0);
    //         }
          
    //      }        
    //  }



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
    
    alert("Antal produkter: " + filteredstuff.length);
            
    return filteredstuff;
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
    let filterQ = filterQueries;
    //alert(filterQ[0][0]);
    //alert(filterQ.brand + filterQ.category + filterQ.model + filterQ.color + filterQ.name + filterQ.price + filterQ.year);
    let products = createProducts(filterQ);

    let j = 0;
    //alert(j);

    for (let i=0; i < products.length; i++) {
    //funktion för att skriva ut produkterna 3 och 3
        if (i%04 == 0) {
            j++;
            
        }

        $("#testdiv").append("<div class='row' id='"+j+"'></div>");

        $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'><b>" + products[i].name + "</b><br>Skick: "+ products[i].new_or_not +" </h5><p class='card-text'> <b>Kategori: </b> "+ products[i].type +"<br> <b>Märke:</b> " + products[i].brand + "<br> <b>Modell:</b> " + products[i].model + "</p> <b><h4>" + products[i].price + "</h4></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");
    }

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        //alert(prod_id);
        $(".product-modal-body").empty();

        $("#productModal").modal('toggle');
        
        $(".product-modal-body").append("<div class='card'><div class='card-body'><h5 class='card-title'> " + products[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ products[prod_id].image +"'><br><p class='card-text'> <b>Märke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>Färg: </b>" + products[prod_id].color + "<br> <b>År: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "</p></div></div>");

    });

    sideBar(products);

}

function sideBar(products){
    $("#brandArea").empty();
    //alert("funkar");
    let prod = products;

    const c = [];

    for(var j = 0; j < prod.length; j++){
    c.push(prod[j].brand);
    }

    var unique = c.filter((v, i, a) => a.indexOf(v) === i);


    for(var i = 0; i < unique.length; i++){
    $("#brandArea").append("<input class='form-check-inpu from-check-inline' type='checkbox' value='' id='checkItem1'><label class='form-check-label' for='defaultCheck1'><span class='text-info'> " +  unique[i] +  " </span></label><br>");

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
