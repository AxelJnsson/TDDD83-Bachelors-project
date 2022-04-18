//BASKET
$('#basketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('toggle');
    getProductsToPrintInBasket();
});

function updateItemNumber(){
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
    $.ajax ({
      url:'/user/'+userID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(data) {
        updateItemNumber2(data);
      }
    }); 
  } else {
    var a = 0;
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    for (let key of productsInCart.keys()){
      a = a + productsInCart.get(key);
    }
    doThings3(a);
  }
}

function updateItemNumber2(data){
  var a = 0
  for (i = 0; i < data[2].length; i++){
    for(j = 0; j < data[2][i].quantity; j++){
      a = a + 1;
    }
  }
  doThings3(a);
}

$('#closeBasketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('hide');
});

$('#xButtonBasket').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
});


function clearCart2(data) {
  if (data[2].length > 0) {
    deleteProductFromCart2(data[2][0].product_id);
    clearCart();
  } else {
    printEmptyBasketModal();
    showPriceInModal(0);
  }
}

function clearCart() {
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
    $.ajax ({
      url:'/user/'+userID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(data) {
        clearCart2(data);
      }
    }); 
  } else {
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    productsInCart.clear();
    sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
    getProductsToPrintInBasket();
  }
}

function addProductToCart(productToAdd){
  sessionStorage.setItem('startedShopping',true);
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    $.ajax({    
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},    
      url:'/product/'+productToAdd+'/adding',
      type: 'POST',
      success: function(u) { 
           //alert("funkar")
          $.ajax({    
            url:'/product/'+ productToAdd,
            type: 'GET',
            success: function(product) { 
              //alert("lägger till "+productToAdd)
              updateprice(parseInt(product.price));
              $("#productModal").modal('hide');
             
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
  } else if (!JSON.parse(sessionStorage.getItem('loggedIn'))){
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    if (productsInCart.get(parseInt(productToAdd))>= 1){
      var newQuantity =productsInCart.get(parseInt(productToAdd))+1;
      productsInCart.set(parseInt(productToAdd), newQuantity);
    }else{
      productsInCart.set(parseInt(productToAdd),1)
    }
    sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)))
  }
  getProductsToPrintInBasket();
}

function getProductsToPrintInBasket(){
  $('#bodyBasketModal').empty();
  sessionStorage.setItem('price',0);
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
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
          showInBasketModal(arrayOfProducts, hasProducts);
        }else{
          showInBasketModal(arrayOfProducts,hasProducts=true);
        }
      }
    }); 
  } else {
    var productsToPrint = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    if (productsToPrint.size<1){
      printEmptyBasketModal();
      showPriceInModal(0);
    }else{
      for (let key of productsToPrint.keys()){
        $.ajax ({
          url:'/product/'+key,
          type: 'GET',
          datatype: 'JSON',
          contentType: "application/json",
          success: function(product) {
            printProductInBasketModal(product,productsToPrint.get(key));
          }
        });
      }
    }
  }
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

  sessionStorage.setItem('price', JSON.parse(sessionStorage.getItem('price')) + product.price*quantity);
  showPriceInModal(JSON.parse(sessionStorage.getItem('price')));
  $('#bodyBasketModal').append('<div id="productDivInBaskedModal">  <img src='+ product.image +' style="height: 150px; width: 150px;">  <div style=""> '+product.name+' <br> '+product.price+'kr <br> Antal: '+quantity+'</div> <button id="deleteButtonForCartItem'+product.product_id+'" class="deleteProductFromCartButton" onClick="deleteProductFromCart(this.value)" data-value="'+product.price+'" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button>  </div> <br>');
}

function deleteProductFromCart(productID){
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    $.ajax ({
      url:'/product/'+ productID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(product) {
        updateprice((parseInt(product.price))*(-1));
        showPriceInModal(JSON.parse(sessionStorage.getItem('price')));
      }
    });
  
    $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/product/'+productID+'/unadding',
      type: 'POST',
      datatype: 'JSON',
      contentType: "application/json",
  
      success: function(product) {
        //getProductsToPrintInBasket(JSON.parse(sessionStorage.getItem('auth')).user.user_id);
        getProductsToPrintInBasket();
      },
      error: function(u){
        alert("tog inte bort fk u");
      } 
    });
  } else{
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    productID = parseInt(productID);
    if (productsInCart.get(productID)==1){
      productsInCart.delete(productID);
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
      getProductsToPrintInBasket();
    } else if(productsInCart.get(productID)>1){
      var newQuantity = productsInCart.get(productID)-1;
      productsInCart.set(productID,newQuantity);
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
      getProductsToPrintInBasket();
    }
  }
}

function deleteProductFromCart2(productID){
  $.ajax ({
    url:'/product/'+ productID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(product) {
      updateprice((parseInt(product.price))*(-1));
      //showPriceInModal(JSON.parse(sessionStorage.getItem('price')));
    }
  });

  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/product/'+productID+'/unadding',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(product) {

    },
    error: function(u){
      //alert("tog inte bort fk u");
    } 
  });
}

function showPriceInModal(currentTotal){
  $('#basketModalPriceDiv').empty();
  if (JSON.parse(sessionStorage.getItem('price'))>0){
    $('#basketModalPriceDiv').append('Din nuvarande Total är: '+ currentTotal+'kr');
  }
}



//KASSA



$('#shopFromBasketButton').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
  $("#sideBarContainer").html($("#empty").html());
  $("#productViewContainer").html($("#empty").html());
  $("#mainViewContainer").html($("#view-cashregister").html());
  printBasketedProducts();
 
 });

function printBasketedProducts(){
  $('#scrollableItemsInBasket').empty();
  sessionStorage.setItem('price',0);
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
    $.ajax ({
      url:'/user/'+userID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(data) {
        showPriceInRegister(sessionStorage.getItem('price'))
        arrayOfProducts = []
        let hasProducts = false;
        data[2].forEach(element =>arrayOfProducts.push(element))
          showInRegister(arrayOfProducts)
      }
    }); 
  } else {
    var productsToPrint = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    if (productsToPrint.size<1){
      showPriceInRegister(sessionStorage.getItem('price'))
    }else{
      for (let key of productsToPrint.keys()){
        $.ajax ({
          url:'/product/'+key,
          type: 'GET',
          datatype: 'JSON',
          contentType: "application/json",
          success: function(product) {
            printProductInBasketRegister(product,productsToPrint.get(key));
            updateprice(product.price*productsToPrint.get(key));
            showPriceInRegister(sessionStorage.getItem('price'));
          }
        });
      }
    }
  } 
}

function showInRegister(products){

  for (let i = 0; i <products.length; i++)
    $.ajax ({
      url:'/product/'+products[i].product_id,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
      success: function(product) {
        updateprice(product.price*products[i].quantity);
        showPriceInRegister(sessionStorage.getItem('price'));
        printProductInBasketRegister(product,products[i].quantity);
      }
    });

}

function printProductInBasketRegister(product,quantity){

  $('#scrollableItemsInBasket').append('<div class="row" id="productDivInRegister"><div class="col-6"><img src='+ product.image +' style="height: 150px; width: 150px;"></div> <div class="col" style=""> '+product.name+' <br> '+product.price+'kr <br> Antal: '+quantity+' <br> <button class="deleteProductFromRegisterButton" onClick="deleteProductFromRegister(this.value)" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button> </div> </div> <br>');
}

function stripeTestFunction(){
  $.ajax ({
      url:'/create-checkout-session',
      type: 'POST',
      datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
      "price":(JSON.parse(sessionStorage.getItem('price')*100))}),
      success: function(checkoutUrl) {    
      // return stripe.redirectToCheckout({sessionId: data.sessionId})
      // recordoOrder()
      window.location.href = checkoutUrl
      }
  }); 
}

function deleteProductFromRegister(productID){
  if (JSON.parse(sessionStorage.getItem('loggedIn'))){
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
  }else{
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    productID = parseInt(productID);
    if (productsInCart.get(productID)==1){
      productsInCart.delete(productID);
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
    } else if(productsInCart.get(productID)>1){
      var newQuantity = productsInCart.get(productID)-1;
      productsInCart.set(productID,newQuantity);
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
    }
    printBasketedProducts();

  }
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
  stripePay(currentTotal*100);

}
