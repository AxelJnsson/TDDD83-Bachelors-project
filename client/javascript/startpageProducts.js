//Alla funktioner i denna fil hämtar och appendar info för de tre produkter som visas på startsidan

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
    $("#productModalFooter").append('<button type="button" class="btn btn-tonehub" data-dismiss="modal" onClick="buyProduct(this.value, this)" value="'+product.product_id+'" id="addProductToCartButton">Lägg i varukorgen</button>');
}

function appendStartProducts(products) {
    $("#startCard1").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[9].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[9].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[9].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[9].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(11)'>Visa info</button><button type='button' class='btn btn-tonehub' style='font-size:10px;' data-dismiss='modal' onClick='buyProduct(this.value, this)' value='" + products[9].product_id + "' id='addProductToCartButton'>Köp</button></div>");
    $("#startCard2").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[31].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[31].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[31].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[31].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(33)'>Visa info</button><button type='button' class='btn btn-tonehub' style='font-size:10px;' data-dismiss='modal' onClick='buyProduct(this.value, this)' value='" + products[31].product_id + "' id='addProductToCartButton'>Köp</button></div>");
    $("#startCard3").append("<div class='col-auto mb-3'><img class='card-img-top prodimg'  src='"+ products[33].image +"' alt='Card image cap' id='prodimg'><div class='card-body'><h5 class='card-title' style='font-size: 25px; font-weight: bold; height: 30px;'>" + products[33].name + "<br><br></h5><p style='font-weight: bold; display:inline;'>Skick: </p><p style='display:inline'>Begagnad</p><br><p style='font-weight: bold; display:inline;'>Kategori: </p><p style='display: inline'>"+ products[33].type +"</p><br><b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[33].price + "kr</p></b></div>" + "<button class='btn btn-secondary' style='font-size:10px' onclick='createProducts3(35)'>Visa info</button><button type='button' class='btn btn-tonehub' style='font-size:10px;' data-dismiss='modal' onClick='buyProduct(this.value, this)' value='" + products[33].product_id + "' id='addProductToCartButton'>Köp</button></div>");
  
    
}