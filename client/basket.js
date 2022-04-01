$('#basketButton').click(function (e) {
    e.preventDefault();
    $("#basketModal").modal('toggle');
    printBasketedProducts();
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

  
function printBasketedProducts(){
  var scrollableProductDiv = document.getElementById('scrollableItemsInBasket')
  for (let i=0; i < 6; i++){
    let id = "productInScrollableAreaDiv"+i;
    scrollableProductDiv.innerHTML += '<div id="productInScrollableAreaDiv'+i+'"> Produkt '+i+' <button id="removeProductFromRegister'+i+'" value="'+id+'" onclick="removeFromRegister(this.value)"> <img src="soptunnapixil.png" width="25" height="30"> </button> </div> <div id="breakBetweenProducts'+i+'"> <br> </div>'
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
  }) 





  // productPrice=100
  //   fetch("/create-checkout-session", {
  //     method: 'POST',
	//     body: JSON.stringify({
  //       price: productPrice,
  //     }), // The data
	//     headers: {
	// 	'Content-type': '' // The type of data you're sending
  //     }
  //   })
  //   .then((result) => { return result.json(); })
  //   .then((data) => {
  //     console.log(data);
  //     // Redirect to Stripe Checkout
  //     return stripe.redirectToCheckout({sessionId: data.sessionId})
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  //   console.log("allabarn");
}