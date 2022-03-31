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
    scrollableProductDiv.innerHTML += '<div id="productInScrollableAreaDiv'+i+'"> Produkt '+i+' <button id="removeProductFromRegister'+i+'"> <img src="soptunnapixil.png" width="25" height="30"> </button>  </div> <br>'
  }
    var div = document.getElementById('totalsumLine');
  div.innerHTML += "Total: " + "1023kr"
   // alert("När vi har fixat lite varor så kommer dom att dyka upp i varukorgen. Men just nu är den permanent tom.");
}

