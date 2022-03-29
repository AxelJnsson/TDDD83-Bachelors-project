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
function createProducts(instrCategory, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear){


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
    const gitarrer = [];
    const pianon = [];
    const trummor = [];
    const studio = [];


    //funktion för att filtrera in i kategorier (som kan vara hårdkodade? eller också hämtas från db så småningom?)
    // for (let i = 0; i < allinstruments.length; i++) {
    //     let prod = allinstruments[i];
    //     switch (prod.category){
    //         case "gitarrer": gitarrer.push(prod);
    //                         break;
    //         case "pianon" : pianon.push(prod);
    //                         break;
    //         case "trumset" : trummor.push(prod);
    //                         break;
    //         case "studio" : studio.push(prod);
    //     }
    // }


    //visar kategorier beroende på menyknapp och ev. filter
    // if (instrCategory == "gitarrer") {
    //      if (filterQ != null) {
    //         return filtertest(gitarrer, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
    //     } else {
    //         return gitarrer;
    //     }
    // } else if (instrCategory == "pianon"){
    //     if (filterQ != null) {
    //         return filtertest(pianon, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
    //     } else {
    //         return pianon;
    //     }    
    // } else if (instrCategory == "trummor"){
    //     if (filterQ != null) {
    //         return filtertest(trummor, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
    //     } else {
    //         return trummor;
    //     }    
    // } else if (instrCategory == "studio") {
    //     if (filterQ != null) {
    //         return filtertest(studio, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
    //     } else {
    //         return studio;
    //     }    
    // } else {
       // alert(inputBrand + inputCategory);
        if (inputBrand != null || inputCategory != null || inputModel != null || inputColor != null || inputName != null || inputPrice != null || inputYear != null) {
            return filtertest(allinstruments, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
        } else {
         return allinstruments;
        
    }
}


//testfunktion för filtrering på märke (funkar!)
function filtertest(arr, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear){
    var filterprod = {category: inputCategory, brand: inputBrand, model: inputModel, name: inputName, price: inputPrice, color : inputColor, year : inputYear}; 
        var arr1 = arr.filter(function(item) {
       //    alert(filterprod.brand + filterprod.category + filterprod.model + filterprod.color + filterprod.name + filterprod.year);

                 for (var key in filterprod) {
                    // alert("hej");
                       if (item[key] != filterprod[key] && filterprod[key] !== undefined) 
                      // alert(item[key] + filterprod[key]);
                    //    if(filterprod[key] === undefined){
                    //        return true;
                    //    }
                            return false;
                     
                 }

                    return true;

       });     

      // return filteredproducts;
      alert(arr1.length);
       return arr1;
     
}


  function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 

      showProdInfo();
  }


  function showProdInfo(category, filterBrand, filterCategory, filterModel, filterColor, filterName, filterPrice, filterYear) {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>");
    let instrumentCategory = category; 
    let inputBrand = filterBrand;
    let inputCategory = filterCategory;
    let inputModel = filterModel;
    let inputColor = filterColor;
    let inputName = filterName;
    let inputPrice = filterPrice;
    let inputYear = filterYear;
    let products = createProducts(instrumentCategory, inputBrand, inputCategory, inputModel, inputColor, inputName, inputPrice, inputYear);
    //alert(guitars.length);

    let j = 0;
    //alert(j);

    for (let i=0; i < products.length; i++) {
      
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
