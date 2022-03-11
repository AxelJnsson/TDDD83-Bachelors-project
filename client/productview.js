//funkar inte än att hämta in klasser från productclasses.js så lägger den här så länge  
  class Product {
    constructor(id, brand, model, name, price, color, year, image, otherinfo){
        this.id = id;
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
function createGuitar(){

    let testgitarr = new Product("1", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");
    let testgitarr2 = new Product("2", "giiiiitarrrrrr", "m", "ännu bättre", "2000 rubel", "rosa", "2020", "gitarklassisk.jpg", "nyskick");
    let testgitarr3 = new Product("3", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr4 = new Product("4", "bäst", "aaa", "carl bildt", "2000 rubel", "blå", "1948","carlbildt.png", "mycket bra skick" );
    let testgitarr5 = new Product("5", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000", "skitfulgitarr.png", "helt fantastisk");


    const gitarrer = [testgitarr, testgitarr2, testgitarr3, testgitarr4, testgitarr5];
    return gitarrer;
}


  function showProdModal(){
    $("#productModal").modal('toggle');
    //$("#productModal").data('bs.modal')._config.backdrop = 'static'; 

      showProdInfo();
  }


  function showProdInfo() {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>"); 
    let guitars = createGuitar();
    //alert(guitars.length);

    let j = 0;
    //alert(j);

    for (let i=0; i < guitars.length; i++) {
      
        if (i%3 == 0) {
            j++;
        }

       $("#testdiv").append("<div class='row' id='"+j+"'></div>");
 
       $("#"+j).append("<div class='col-sm'><div class='card'><img class='card-img-top'  src='"+ guitars[i].image +"' alt='Card image cap'><div class='card-body'><h5 class='card-title'>" + guitars[i].name + "</h5><p class='card-text'> <b>Märke:</b> " + guitars[i].brand + "<br> <b>Modell:</b> " + guitars[i].model + "<br> <b>Pris:</b> " + guitars[i].price + "</p></div>" + "<button class='btn btn-primary btnInfo' data-id='"+ i + "'>info</button></div></div>");

        

    }

    $('.btnInfo').on("click" ,function (e) {
        var prod_id = $(this).data('id');
        //alert(prod_id);
        $(".product-modal-body").empty();

        $("#productModal").modal('toggle');
        
        $(".product-modal-body").append("<div class='card'><div class='card-body'><h5 class='card-title'> " + guitars[prod_id].name +  "</h5><br><img class='card-img-top' src='"+ guitars[prod_id].image +"'><br><p class='card-text'> <b>Märke:</b> " + guitars[prod_id].brand + "<br> <b>Modell:</b> " + guitars[prod_id].model + "<br> <b>Färg: </b>" + guitars[prod_id].color + "<br> <b>År: </b>" + guitars[prod_id].year + "<br> <b>Pris:</b> " + guitars[prod_id].price + "<br> <b>Övrig info:</b> " + guitars[prod_id].otherinfo + "</p></div></div>");

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
