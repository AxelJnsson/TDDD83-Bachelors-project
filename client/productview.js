/*$('#prod1').click(function (e) {
    $("#productModal").modal('toggle');
   
      e.preventDefault();
  });Ä*/
  
  $('#closeProductModal').click(function (e) {
    $(".product-modal-body").remove();                    
    $("#productModal").modal('hide');  

      e.preventDefault();
  });
  
  function showProdInfo() {
    $("#productModal").modal('toggle');
    //$(".product-modal-body").append('<p>nånting nånting yamaha</p>');                    
  
  
  }