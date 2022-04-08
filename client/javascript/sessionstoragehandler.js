function updateUserPriceAtLogin(useID){
    $.ajax ({
        url:'/user/'+useID,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        success: function(data) {

          arrayOfProducts = []
          data[2].forEach(element =>arrayOfProducts.push(element))

          for(let i=0; i<arrayOfProducts.length; i++){

            $.ajax ({
                url:'/product/'+arrayOfProducts[i].product_id,
                type: 'GET',
                datatype: 'JSON',
                contentType: "application/json",
                success: function(product) {
                    currentSessionPrice = parseInt(sessionStorage.getItem('price'));
                    amountToAddFromLogin = parseInt(product.price* arrayOfProducts[i].quantity);
                    sessionStorage.setItem(('price'),currentSessionPrice+amountToAddFromLogin);
                }
              });
          }
        }
      }); 
    sessionStorage.setItem('priceUpToDate', true);
  }