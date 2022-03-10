/*$('#prod1').click(function (e) {
    $("#productModal").modal('toggle');
   
      e.preventDefault();
  });Ä*/
  
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

function createGuitar(){

    let testgitarr = new Product("1", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000");

    return testgitarr;
}


  function showProdModal(){
    $("#productModal").modal('toggle');
      showProdInfo();
  }

  //var ptest = "<p>hej</p>";

  function showProdInfo() {
    //  alert("h");
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>"); 
    createGuitar();
    $(".product-modal-body").append("Produktnamn: " + createGuitar().name + "<br> Märke: " + createGuitar().brand + "<br> Modell: " + createGuitar().model + "<br> Pris: " + createGuitar().price);
           
    
  }

  $('#closeProductModal').on("click" ,function (e) {
   // $('.ptest').remove();
    $(".product-modal-body").empty();
    $("#productModal").modal('hide');  
    e.preventDefault();
});

  $('#xProduct').on("click" ,function (e) {
  //  $('.ptest').remove();
  $(".product-modal-body").empty();
    $("#productModal").modal('hide');  
   e.preventDefault();
});