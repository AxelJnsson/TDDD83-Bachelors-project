//BASKET
$('#basketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('toggle');
    getProductsToPrintInBasket(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
    showPriceInModal(sessionStorage.getItem('price'));
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
  // alert(productToAdd)
    $.ajax({    
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},    
      url:'/product/'+productToAdd+'/adding',
      type: 'POST',
      success: function(u) { 
          // alert("funkar")
          $.ajax({    
            url:'/product/'+ productToAdd,
            type: 'GET',
            success: function(product) { 
              updateprice(parseInt(product.price));
            },
            error: function(u){
                alert("uppdaterade inte priset. ägd.");
            }    
        });
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
      let hasProducts = false;
      data[2].forEach(element =>arrayOfProducts.push(element))
      if (arrayOfProducts.length < 1){
        showInBasketModal(arrayOfProducts, hasProducts)

      }else{

        showInBasketModal(arrayOfProducts,hasProducts=true);

      }
    }
  }); 
}

function showInBasketModal(products, hasProducts){
  if (hasProducts){
    for (let i = 0; i <products.length; i++)
    $.ajax ({
      url:'/product/'+products[i].product_id,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(product) {
        printProductInBasketModal(product,products[i].quantity);
      }
    });
  } else{
    printEmptyBasketModal()
  }
}

function printEmptyBasketModal(){
  $('#bodyBasketModal').empty();
  $('#bodyBasketModal').append("Varukorgen är tom!")
}

function printProductInBasketModal(product, quantity){
  $('#bodyBasketModal').append('<div id="productDivInBaskedModal">  <img src='+ product.image +' style="height: 150px; width: 150px;">  <div style=""> '+product.name+' <br> '+product.price+'kr <br> Antal: '+quantity+'</div> <button id="deleteButtonForCartItem'+product.product_id+'" class="deleteProductFromCartButton" onClick="deleteProductFromCart(this.value)" data-value="'+product.price+'" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button>  </div> <br>');
}

function deleteProductFromCart(productID){
  $.ajax ({
    url:'/product/'+productID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(product) {
      updateprice((parseInt(product.price))*-1);
      showPriceInModal(sessionStorage.getItem('price'));
    }
  });

  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/product/'+productID+'/unadding',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",

    success: function(product) {
      // alert("tog bort")
      getProductsToPrintInBasket(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
    },
    error: function(u){
      alert("tog inte bort fk u");
    } 
  });
}

function showPriceInModal(currentTotal){
  $('#basketModalPriceDiv').empty();
  $('#basketModalPriceDiv').append('Din nuvarande Total är: '+ currentTotal+'kr');


}



//KASSA



$('#shopFromBasketButton').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
  $("#sideBarContainer").html($("#empty").html());
  $("#productViewContainer").html($("#empty").html());
  $("#mainViewContainer").html($("#view-cashregister").html());
  printBasketedProducts(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
  showPriceInRegister(sessionStorage.getItem('price'));
  });

function printBasketedProducts(userID){
  $('#scrollableItemsInBasket').empty();
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
  $('#scrollableItemsInBasket').append('<div id="productDivInRegister">  <img src='+ product.image +' style="height: 150px; width: 150px;">  <div style=""> '+product.name+' <br> '+product.price+'kr </div> <button class="deleteProductFromRegisterButton" onClick="deleteProductFromRegister(this.value)" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button>  </div> <br>');
}

function stripeTestFunction(){
  alert("as")
  $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/create-checkout-session',
      type: 'POST',
      datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
      "price":(sessionStorage.getItem('price')*100)}),
      success: function(checkoutUrl) {    
      // return stripe.redirectToCheckout({sessionId: data.sessionId})
      window.location.href = checkoutUrl
      }
  }); 
}

function deleteProductFromRegister(productID){
  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/product/'+productID+'/unadding',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",

    success: function(product) {
      // alert("tog bort")
      printBasketedProducts(JSON.parse(sessionStorage.getItem('auth')).user.user_id)
    },
    error: function(u){
      alert("tog inte bort fk u");
    } 
  });
}

function updateprice(price){
  // alert("uppdaterade priset med "+price+"kr")
  let oldPrice = parseInt(sessionStorage.getItem('price'));
  let newPrice = oldPrice + price;
  sessionStorage.setItem('price', newPrice);           
}

function showPriceInRegister(currentTotal){
  $('#totalsumLine').empty();
  $('#totalsumLine').append("Total: " + currentTotal + "kr");
}