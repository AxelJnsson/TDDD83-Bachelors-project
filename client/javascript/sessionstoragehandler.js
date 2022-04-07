function updateUserPriceAtLogin(userAndToken){

    $.ajax ({
        url:'/user/'+userAndToken.user.user_id,
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
                    console.log(currentSessionPrice+amountToAddFromLogin);
                    sessionStorage.setItem(('price'),currentSessionPrice+amountToAddFromLogin);
                }
              });
          }
        }
      }); 
  }