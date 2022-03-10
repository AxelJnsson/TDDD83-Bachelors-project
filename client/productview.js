//funkar inte än att hämta in klasser från productclasses.js så lägger den här så länge  
  class Product {
    constructor(id, brand, model, name, price, color, year){
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.price = price;
        this.color = color;
        this.year = year;     

    }
}

//testfunktion
function createGuitar(){

    let testgitarr = new Product("1", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000");

    return testgitarr;
}


  function showProdModal(){
    $("#productModal").modal('toggle');
      showProdInfo();
  }


  function showProdInfo() {
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>"); 
    createGuitar();
    $(".product-modal-body").append("<b>Produktnamn:</b> " + createGuitar().name + "<br> <b>Märke:</b> " + createGuitar().brand + "<br> <b>Modell:</b> " + createGuitar().model + "<br> <b>Pris:</b> " + createGuitar().price);
           
    
  }

$('#closeProductModal').on("click" ,function (e) {
    $(".product-modal-body").empty();
    $("#productModal").modal('hide');  
    e.preventDefault();
});

$('#xProduct').on("click" ,function (e) {
  $(".product-modal-body").empty();
    $("#productModal").modal('hide');  
   e.preventDefault();
});