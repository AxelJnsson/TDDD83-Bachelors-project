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
    let testgitarr2 = new Product("2", "giiiiitarrrrrr", "m", "ännu bättre", "2000 rubel", "rosa", "2020" );
    let testgitarr3 = new Product("3", "brand", "aaa", "carl bildt", "2000 rubel", "blå", "1995" );


    const gitarrer = [testgitarr, testgitarr2, testgitarr3];
    return gitarrer;
}


  function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 

      showProdInfo();
  }


  function showProdInfo() {
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>"); 
    let guitars = createGuitar();
    alert("produktinfon skriver just nu ut flera olika beskrivningar pga test av loop")
    for (let i=0; i < guitars.length; i++) {

        $(".product-modal-body").append("<b>Produktnamn:</b> " + guitars[i].name + "<br> <b>Märke:</b> " + guitars[i].brand + "<br> <b>Modell:</b> " + guitars[i].model + "<br> <b>Pris:</b> " + guitars[i].price + "<br><br>");

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
