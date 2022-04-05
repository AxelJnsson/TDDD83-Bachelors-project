//BASKET

$('#basketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('toggle');
    getProductsToPrintInBasket(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
  });

$('#closeBasketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('hide');
  });

$('#xButtonBasket').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
  });


function addProductToCart(productToAdd){
  alert(productToAdd)
    $.ajax({    
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},    
      url:'/product/'+productToAdd+'/adding',
      type: 'POST',
      success: function(u) { 
        alert("funkar")         
      },
      error: function(u){
          alert("funkarej");
      }    
  });
}

function getProductsToPrintInBasket(userID){
  $('#bodyBasketModal').empty();
  $.ajax ({
    url:'/user/'+userID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(data) {
      arrayOfProducts = []
      data[2].forEach(element =>arrayOfProducts.push(element))
      showInBasketModal(arrayOfProducts)
    }
  }); 
}

function showInBasketModal(products){

  for (let i = 0; i <products.length; i++)
    $.ajax ({
      url:'/product/'+products[i].product_id,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(product) {
        printProductInBasketModal(product);
      }
    });
}

function printProductInBasketModal(product){
  $('#bodyBasketModal').append('<div id="productDivInBaskedModal">  <img src='+ product.image +' style="height: 150px; width: 150px;">  <div style=""> '+product.name+' <br> '+product.price+'kr </div> <button class="deleteProductFromCartButton" onClick="deleteProductFromCart(this.value)" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button>  </div> <br>');
}

function deleteProductFromCart(productID){
  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/product/'+productID+'/unadding',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",

    success: function(product) {
      alert("tog bort")
      getProductsToPrintInBasket(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
    },
    error: function(u){
      alert("tog inte bort fk u");
    } 
  });
}





//KASSA



$('#shopFromBasketButton').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
  $("#mainViewContainer").html($("#view-cashregister").html());
  printBasketedProducts(JSON.parse(sessionStorage.getItem('auth')).user.user_id)
  });

function printBasketedProducts(userID){
  $.ajax ({
    url:'/user/'+userID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(data) {
      arrayOfProducts = []
      data[2].forEach(element =>arrayOfProducts.push(element))
      showInRegister(arrayOfProducts)
    }
  }); 
}

function showInRegister(products){

  for (let i = 0; i <products.length; i++)
  $.ajax ({
    url:'/product/'+products[i].product_id,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(product) {
      printProductInBasketRegister(product);
    }
  });

}

function printProductInBasketRegister(product){
  $('#scrollableItemsInBasket').append("asdasdasdas");
}

function stripeTestFunction(){
  $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/create-checkout-session',
      type: 'POST',
      datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
      "price":123123}),
      success: function(data) {    
      return stripe.redirectToCheckout({sessionId: data.sessionId})
      }
  }); 
}