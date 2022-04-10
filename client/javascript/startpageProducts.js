function createProducts2(){ 
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            appendStartProducts(allinstruments);
        },
        error: function(){
            alert("fel");
        }    
    });
}

function createProducts3(id){ 
    $.ajax({        
        url:'/product',
        type: 'GET',
        success: function(u) {          
            var allinstruments = u;
            toggleProductModal(allinstruments[id]);
        },
        error: function(){
            alert("fel");
        }    
    });
}

function toggleProductModal(product) {
    $(".product-modal-body").empty();
    $("#productModalFooter").empty();

    $("#productModal").modal('toggle');
    $(".product-modal-body").append("<div class='card-body'><h5 class='card-title' style='text-align: center; font-weight: bold;'> " + product.name +  "</h5><br><img class='card-img-top' style='margin-left: 90px;' src='"+ product.image +"'><br><p class='card-text' style='text-align: center'> <b>Märke:</b> " + product.brand + "<br> <b>Modell:</b> " + product.model + "<br> <b>Färg: </b>" + product.color + "<br> <b>År: </b>" + product.year + "<br> <b>Pris:</b> " + product.price + "</p></div>");
    $("#productModalFooter").append('<button type="button" class="btn btn-primary" data-dismiss="modal" onClick="addProductToCart(this.value)" value="'+product.product_id+'" id="addProductToCartButton">Lägg i varukorgen</button>');
}

function appendStartProducts(products) {
    $("#startCard1").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[12].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[12].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[12].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[12].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(12)'>Visa info</button><button type='button' class='btn btn-primary' style='font-size:10px;' data-dismiss='modal' onClick='addProductToCart(this.value)' value='" + products[12].product_id + "' id='addProductToCartButton'>Köp</button></div>");
    $("#startCard2").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[34].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[34].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[34].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[34].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(34)'>Visa info</button><button type='button' class='btn btn-primary' style='font-size:10px;' data-dismiss='modal' onClick='addProductToCart(this.value)' value='" + products[34].product_id + "' id='addProductToCartButton'>Köp</button></div>");
    $("#startCard3").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[36].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[36].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[36].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[36].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(36)'>Visa info</button><button type='button' class='btn btn-primary' style='font-size:10px;' data-dismiss='modal' onClick='addProductToCart(this.value)' value='" + products[36].product_id + "' id='addProductToCartButton'>Köp</button></div>");
  
    
}