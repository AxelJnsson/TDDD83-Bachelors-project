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
  $(".container").html($("#view-cashregister").html());
  });

function printBasketedProducts(){
   // alert("När vi har fixat lite varor så kommer dom att dyka upp i varukorgen. Men just nu är den permanent tom.");
}