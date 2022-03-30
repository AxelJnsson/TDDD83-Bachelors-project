//funkar inte än att hämta in klasser från productclasses.js så lägger den här så länge  
  class Product {
    constructor(id, category, brand, model, name, price, color, year, image, otherinfo){
        this.id = id;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.price = price;
        this.color = color;
        this.year = year;
        this.image = image;
        this.otherinfo = otherinfo;     

    }
}

//testfunktion med hårdkodade testprodukter (att fungera som "databas" så länge)
//function createProducts(filterQueries){

    function createProducts(filteringByArrayTest){

    //testgitarrer
    let testgitarr = new Product("1", "gitarrer", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    let testgitarr2 = new Product("2", "gitarrer", "giiiiitarrrrrr", "m", "ännu bättre", "2000 rubel", "rosa", "2020", "gitarklassisk.jpg", "nyskick");
    let testgitarr3 = new Product("3", "gitarrer", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr4 = new Product("4", "gitarrer", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr5 = new Product("5", "gitarrer", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    let testgitarr6 = new Product("6", "gitarrer" , "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    let testgitarr7 = new Product("11", "gitarrer", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "elgitarröd.jpeg", "helt fantastisk");
    let testgitarr8 = new Product("12", "gitarrer", "Yamaha", "modell", "en annan gitarr ", "100 kr", "svart", "333", "elgitarsvart.jpg", "helt fantastisk");

    //testpianon
    let testpiano = new Product("7", "pianon", "Yamaha", "idk", "Mycket fint piano", "100000 kr", "Svart", "2005", "piano.jpeg", "Svindyrt piano i bra skick");
    let testpiano2 = new Product("10", "pianon", "trevlig", " 1", "Fredrik", "100000000000 kr", "lila", "1993", "testbildkassa.png", "väldigt dyr");

    //testtrummor
    let testtrumma = new Product("8", "trummor", "märke", "idk", "nej", "nej", "svart", "2020", "trumset.jpeg", "trummor");

    //teststudio
    let teststudio = new Product("9", "studio", "Behringer", "någon modell", "Trevlig mixer", "20000 kr" , "Grå", "2021", "mixer.png", "Helt bra analog mixer");

    const allinstruments = [testgitarr, testgitarr2, testgitarr3, testgitarr4, testgitarr5, testgitarr6, testgitarr7, testgitarr8, testpiano, testpiano2, teststudio, testtrumma];
   
  
    //     if (filterQueries.brand != null || filterQueries.category != null || filterQueries.model != null || filterQueries.color != null || filterQueries.name != null || filterQueries.price != null || filterQueries.year != null) {
    //         return filtertest(allinstruments, filterQueries.brand, filterQueries.category, filterQueries.model, filterQueries.color, filterQueries.name, filterQueries.price, filterQueries.year);
    //     } else {
    //      return allinstruments;
        
    // }
   return filtertest2(allinstruments, filteringByArrayTest);
}


//testfunktion för filtrering på märke (funkar!), kanske bör ändra namn dock
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

function filtertest2(arr, testingArrayFilters){
    const categories = testingArrayFilters[0];
    //alert(categories[0] + categories[1]);
    const brands = testingArrayFilters[1];
    const models = testingArrayFilters[2];
    const names = testingArrayFilters[3];
    const prices = testingArrayFilters[4];
    const colors = testingArrayFilters[5];
    const years = testingArrayFilters[6];
   //var arr1 = arr.filter( function(el) {
    //alert("vi kommer hit");
   // for(var key in testingArrayFilters) {
     //  if (testingArrayFilters[key].length != 0) {
    //alert(years.length);
    var filteredstuff = arr;
    alert(filteredstuff.length);

    if(categories.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            categories.indexOf(el.category) >= 0);
    }

    alert(filteredstuff.length);

    if(brands.length !== 0) {
        filteredstuff = filteredstuff.filter( el => 
            brands.indexOf(el.brand) >= 0);
    }

    if(models.length !== 0) {
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
    
     alert("hej");  
       
        
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
    alert(filterQ[0][0]);
    //alert(filterQ.brand + filterQ.category + filterQ.model + filterQ.color + filterQ.name + filterQ.price + filterQ.year);
    let products = createProducts(filterQ);

    let j = 0;
    //alert(j);

    for (let i=0; i < products.length; i++) {
        //funktion för att skriva ut produkterna 3 och 3
        if (i%3 == 0) {
            j++;
        }

        $("#testdiv").append("<div class='row' id='"+j+"'></div>");

       $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'>" + products[i].name + "</h5><p class='card-text'> <b>Kategori: </b> "+ products[i].category +"<br> <b>Märke:</b> " + products[i].brand + "<br> <b>Modell:</b> " + products[i].model + "</p> <b><h4>" + products[i].price + "</h4></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>Visa info</button></div></div>");

        

    }

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        //alert(prod_id);
        $(".product-modal-body").empty();

        $("#productModal").modal('toggle');
        
        $(".product-modal-body").append("<div class='card'><div class='card-body'><h5 class='card-title'> " + products[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ products[prod_id].image +"'><br><p class='card-text'> <b>Märke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>Färg: </b>" + products[prod_id].color + "<br> <b>År: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "<br> <b>Övrig info:</b> " + products[prod_id].otherinfo + "</p></div></div>");

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
