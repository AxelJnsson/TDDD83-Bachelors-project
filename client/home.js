$(document).ready(function(){
    // Kod i detta block körs när dokumentet laddats klart.    
    $(".container").html($("#view-home").html())  
 })

$('#aboutButton').click(function (e) {
   
   
    $(".container").html($("#view-about").html())  
   
    e.preventDefault();
  });

  $('#gitarButton2').click(function (e) {   
    $(".container").html($("#view-product").html())  

    e.preventDefault();
  });

$('#homeButton').click(function (e) {
  $(".container").html($("#view-home").html())  
    e.preventDefault();
});

$('#prod1').click(function (e) {
  $("#productModal").modal('toggle');
 
    e.preventDefault();
});

$('#closeProductModal').click(function (e) {
  $("#productModal").modal('hide');
 
    e.preventDefault();
});

function showProdInfo() {
  $("#productModal").modal('toggle');
  $(".product-modal-body").append('<p>nånting nånting yamaha</p>');                    


}

