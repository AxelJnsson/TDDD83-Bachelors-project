/*$('#prod1').click(function (e) {
    $("#productModal").modal('toggle');
   
      e.preventDefault();
  });Ä*/
  
  
  function showProdModal(){
    $("#productModal").modal('toggle');
      showProdInfo();
  }

  //var ptest = "<p>hej</p>";

  function showProdInfo() {
    //  alert("h");
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>"); 
    $(".product-modal-body").append(createGuitar().name);
           
    
  }

  $('#closeProductModal').on("click" ,function (e) {
    $('.ptest').remove();
    $("#productModal").modal('hide');  
    e.preventDefault();
});

  $('#xProduct').on("click" ,function (e) {
    $('.ptest').remove();
    $("#productModal").modal('hide');  
   e.preventDefault();
});