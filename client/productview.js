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

//testfunktion
function createProducts(instrCategory){

    //testgitarrer
    let testgitarr = new Product("1", "gitarrer", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    let testgitarr2 = new Product("2", "gitarrer", "giiiiitarrrrrr", "m", "ännu bättre", "2000 rubel", "rosa", "2020", "gitarklassisk.jpg", "nyskick");
    let testgitarr3 = new Product("3", "gitarrer", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr4 = new Product("4", "gitarrer", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr5 = new Product("5", "gitarrer", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    //let testgitarr6 = new Product("6", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");

    //testpianon
    let testpiano = new Product("7", "pianon", "Babock", "idk", "Mycket fint piano", "100000 kr", "Svart", "2005", "piano.jpeg", "Svindyrt piano i bra skick");
    let testpiano2 = new Product("10", "pianon", "trevlig", " 1", "Fredrik", "1000000000000000 kr", "lila", "1993", "testbildkassa.png", "väldigt dyr");

    //testtrummor
    let testtrumma = new Product("8", "trumset", "märke", "idk", "nej", "nej", "svart", "2020", "trumset.jpeg", "trummor");

    //teststudio
    let teststudio = new Product("9", "studio", "Behringer", "någon modell", "Trevlig mixer", "20000 kr" , "Grå", "2021", "mixer.png", "Helt bra analog mixer");


    if (instrCategory == "gitarrer") {
        const gitarrer = [testgitarr, testgitarr2, testgitarr3, testgitarr4, testgitarr5];
        return gitarrer;
    } else if (instrCategory == "pianon"){
        const pianon = [testpiano, testpiano2];
        return pianon;
    } else if (instrCategory == "trummor"){
        const trummor = [testtrumma];
        return trummor;
    } else if (instrCategory == "studio") {
        const studio = [teststudio];
        return studio;
    }
}


  function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 

      showProdInfo();
  }


  function showProdInfo(category) {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>");
    let instrumentCategory = category; 
    let products = createProducts(instrumentCategory);
    //alert(guitars.length);

    let j = 0;
    //alert(j);

    for (let i=0; i < products.length; i++) {
      
        if (i%3 == 0) {
            j++;
        }

        $("#testdiv").append("<div class='row' id='"+j+"'></div>");

       $("#"+j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='"+ products[i].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title'>" + products[i].name + "</h5><p class='card-text'> <b>Kategori: </b> "+ products[i].category +"<br> <b>Märke:</b> " + products[i].brand + "<br> <b>Modell:</b> " + products[i].model + "<br> <b>Pris:</b> " + products[i].price + "</p></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>info</button></div></div>");

        

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
