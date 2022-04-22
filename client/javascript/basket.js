//BASKET
$('#basketButton').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('toggle');
  getProductsToPrintInBasket();
});

$('#basketModal').on('hide.bs.modal', function (e) {
  updateItemNumber();
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
        updateItemNumberLoggedIn(data);
      }
    }); 
  } else {
    var a = 0;
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    for (let key of productsInCart.keys()){
      a = a + productsInCart.get(key);
    }
    updateCartNumber(a);
  }
}

<<<<<<< HEAD
//Räknar ut antal produkter i varukorgen om man är inloggad
function updateItemNumberLoggedIn(data){
=======
function updateItemNumber2(data){
>>>>>>> parent of 2bf19e4 (fixat med sökmotor och refaktorering)
  var a = 0
  for (i = 0; i < data[2].length; i++){
    for(j = 0; j < data[2][i].quantity; j++){
      a = a + 1;
    }
  }
  updateCartNumber(a);
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
  for (let i = 0; i< data[2].length; i++){
    var iterQuant = parseInt(data[2][i].quantity);
    while (iterQuant>0){
      deleteProductFromCart2(data[2][i].product_id);
      iterQuant--;
    }
  }
  $("#basketModal").modal('hide');
  showPriceInModal(0);
  $("#sideBarContainer").html($("#view-sidebar").html())
  $("#productViewContainer").html($("#view-product").html())
  $("#mainViewContainer").html($("#empty").html())

  //showProdInfo("allt", null);
  resetFilter();
  //filternewornot.push("Ny", "Begagnad");
  filternewornot.length = 0;
  filternewornot.push(0, 1); 
  showProdInfo(filterQ);
  createCategoriesForSidebar();
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
  showPriceInModal(0);
  $("#basketModal").modal('hide');
  $("#sideBarContainer").html($("#view-sidebar").html())
  $("#productViewContainer").html($("#view-product").html())
  $("#mainViewContainer").html($("#empty").html())

  //showProdInfo("allt", null);
  resetFilter();
  //filternewornot.push("Ny", "Begagnad");
  filternewornot.length = 0;
  filternewornot.push(0, 1); 
  showProdInfo(filterQ);
  createCategoriesForSidebar();
  updateItemNumber();
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
          $.ajax({    
            url:'/product/'+ productToAdd,
            type: 'GET',
            success: function(product) { 
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
  // button = document.getElementById('addProductToCartButton'+productToAdd);
  // button.remove();


  var checkQuantityTemp = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));

  if (checkQuantityTemp.has(parseInt(productToAdd))){
    var q = checkQuantityTemp.get(parseInt(productToAdd));
  } else{
    var q = 0;
  }
  $.ajax({
    url:'/product/' + productToAdd,
    type: 'GET',
    success: function(product) {
      if ((product.quantity-q)<1){
        addToCardButton = document.getElementById('addProductToCartButton'+product.product_id);
        addToCardButton.remove();
        $('#buttonDivForProductView'+product.product_id).append("<button type='button' class='btn btn-red' style='font-size:10px; background-color: red;' data-dismiss='modal'onClick='outOfStockAlert()' value='"+parseInt(productToAdd)+"' id='addProductToCartButtonOut"+parseInt(productToAdd)+"'>Slut<span class='cart-item'></span></button>");

      }
    }
   });
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
  $('#tableHeadModal').empty();
  $('#bodyBasketModal').append("Varukorgen är tom!")
}

//lägger till tabellhuvudet
function printProductInBasketModal(product, quantity){
  $('#tableHeadModal').empty();
  $('#tableHeadModal').append(`<table class="table table-image">
  <thead>
    <tr>
      <th scope="col"></th><th scope="col"></th>
      <th scope="col"></th><th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">Produkt</th>
      <th scope="col"></th>
      <th scope="col">Pris</th>
      <th scope="col"></th><th scope="col"></th>
      <th scope="col">Kvantitet</th>
    </tr>
  </thead>
</table>`)
//räknar fram och skriver ut totalsumma samt printar ut produkterna
  sessionStorage.setItem('price', JSON.parse(sessionStorage.getItem('price')) + product.price*quantity);
  showPriceInModal(JSON.parse(sessionStorage.getItem('price')));
 // $('#bodyBasketModal').append('<div id="productDivInBaskedModal">  <img src='+ product.image +' style="height: 150px; width: 150px;">  <div style=""> '+product.name+' <br> '+product.price+'kr <br> Antal: '+quantity+'</div> <button id="deleteButtonForCartItem'+product.product_id+'" class="deleteProductFromCartButton" onClick="deleteProductFromCart(this.value)" data-value="'+product.price+'" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button>  </div> <br>');
  $('#bodyBasketModal').append(' <table class="table table-image"><tbody><tr> <td class="w-25"><img src='+ product.image +'  style="height: 150px; width: 150px;"></td> <td id="productName"> '+product.name+' </td> <th id=pricePrint> '+product.price+'kr</th><td> <div class = btn-group><button class="w3-button w3-black" onClick="deleteProductFromCart(this.value)" data-value="'+product.price+'" value="'+product.product_id+'">-</button><button class="w3-button w3-white"> '+quantity+'</button> <button class="w3-button w3-teal" onclick= "addProductToCart(this.value);" value="'+product.product_id+'">+</button> </div></td></tr></tbody></table>');
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
    async: false,
    success: function(product) {
      updateItemNumber();

    },
    error: function(u){
    } 
  });
}

function showPriceInModal(currentTotal){
  $('#basketModalPriceDiv').empty();
  if (JSON.parse(sessionStorage.getItem('price'))>0){
    $('#basketModalPriceDiv').append('<a id="totalprice">Din nuvarande total är: '+ currentTotal+'kr</a>');
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
        if (arrayOfProducts.length == 0){
          printEmptyRegister()
        }else{
          showInRegister(arrayOfProducts)
        }   
      }
    }); 
  } else {
    var productsToPrint = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
    if (productsToPrint.size<1){
      printEmptyRegister()
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
 // $('#scrollableItemsInBasket').append('<div class="row" id="productDivInRegister"><div class="col-6"><img src='+ product.image +' style="height: 150px; width: 150px;"></div> <div class="col" style=""> '+product.name+' <br> '+product.price+'kr <br> Antal: '+quantity+' <br> <button class="deleteProductFromRegisterButton" onClick="deleteProductFromRegister(this.value)" value="'+product.product_id+'"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button> </div> </div> <br>');
  $('#scrollableItemsInBasket').append('<div class="row" id="productDivInRegister"><div class="col-6"><img src='+ product.image +' style="height: 150px; width: 150px;"></div> <div class="col" style=""> '+product.name+' <br> '+product.price+'kr <br>  <button class="w3-button w3-black" onClick="deleteProductFromRegister(this.value)" data-value="'+product.price+'" value="'+product.product_id+'">-</button><button class="w3-button w3-white" id ="quantityInBasket" value ="'+quantity+'">'+quantity+'</button> <button class="w3-button w3-teal" id="increaseButton" onclick= "executeThings(this.value);" value="'+product.product_id+'">+</button></div> </div> <br>');
}

function executeThings(product) {
  addProductToCart(product);
  printBasketedProducts();
  }

function printEmptyRegister() {
  $('#scrollableItemsInBasket').append('<div id="emptyBasketRegister">Din varukorg är tom!</div> <div id="contShop" onclick="showAllInst()"><p style="cursor: pointer;">Tryck här för att forsätta shoppa!</p></div>');
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
  $('#totalsumLine').append( + currentTotal + "kr");
  stripePay(currentTotal*100);
 getUserdetails();

}

function getUserdetails() { 
  
//var namn = JSON.parse(sessionStorage.getItem('auth')).user.first_name;
  $('#cashName').val(JSON.parse(sessionStorage.getItem('auth')).user.first_name);
  $('#cashEmail').val(JSON.parse(sessionStorage.getItem('auth')).user.email);
  $('#cashName').val(JSON.parse(sessionStorage.getItem('auth')).user.first_name);
}


function addOrdersAndItemsToHistory () {
//INTE DEN KOD SOM SKA VARA KSA SKRIVAS OM
console.log("Här")
userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id

  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/order/' +userID,
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",

    success: function(ordernr) {
      alert("la till order");
      alert(ordernr);
      addItemToOrder(ordernr); 
    },
    error: function(){
      alert("la inte till order fk u");
    } 
  });

}





function addItemToOrder(ordernr){
    //ajax

  $.ajax ({
    //headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/orderitem/' + userID,
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",

    success: function(userID) {
      //do something
      alert(ordernr);
    },
    error: function(){
      alert("la inte till order fk u 2");
    } 
  });
}
