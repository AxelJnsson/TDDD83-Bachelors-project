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

$('#shopFromBasketButton').click(function (e) {
  e.preventDefault();
  $("#basketModal").modal('hide');
  $("#mainViewContainer").html($("#view-cashregister").html());
  printBasketedProducts()
  });

// $('#addProductToCart').click(function (e) {
//   e.preventDefault();
//   alert("hjej")
//   });

function addProductToCart(productToAdd){
  alert(productToAdd)
  //var temUserID = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
  //   $.ajax({
  //     headers: {
  //       "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},    
  //     url:'/user/'+temUserID,
  //     type: 'GET',
  //     success: function(u) { 
  //       alert(u)         
  //     },
  //     error: function(){
  //         alert("la inte till");
  //     }    
  // });
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
  //   $.ajax({        
  //     headers: {
  //       "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
  //     url:'/product/'+productToAdd+'/unadding',
  //     type: 'POST',
  //     success: function(u) { 
  //       alert("tog bort")       
  //     },
  //     error: function(){
  //         alert("tog inte bort");
  //     }    
  // });
}

  
function printBasketedProducts(){
  var scrollableProductDiv = document.getElementById('scrollableItemsInBasket')
  for (let i=0; i < 6; i++){
    let id = "productInScrollableAreaDiv"+i;
    scrollableProductDiv.innerHTML += '<div id="productInScrollableAreaDiv'+i+'"> Produkt '+i+' <button id="removeProductFromRegister'+i+'" value="'+id+'" onclick="removeFromRegister(this.value)"> <img src="/images/soptunnapixil.png" width="25" height="30"> </button> </div> <div id="breakBetweenProducts'+i+'"> <br> </div>'
  }
    var div = document.getElementById('totalsumLine');
    div.innerHTML += "Total: " + "1023kr"
   // alert("När vi har fixat lite varor så kommer dom att dyka upp i varukorgen. Men just nu är den permanent tom.");
}

function removeFromRegister(id){
  var allabarn = document.getElementById(id)
  allabarn.remove();
  var breakBetween = document.getElementById("breakBetweenProducts"+id[id.length-1])
  breakBetween.remove();
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

function getProductsToPrintInBasket(userID){
  $.ajax ({
    // headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
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
      // headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
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



  

}